/**
 * Phona pronunciation practice page (after login)
 * Chat-style UI, Web Speech API for speech recognition, accuracy threshold 90%
 */
'use client';

import { Suspense, useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Mic, Volume2, Settings2, X } from 'lucide-react';

const DEFAULT_PRACTICE_WORDS = ['cat', 'hat', 'bat', 'mat', 'sat', 'red', 'bed', 'led', 'sit', 'hit'];

/** Word lists per phonetic category (Dashboard → Practice) */
const SOUND_TO_WORDS: Record<string, string[]> = {
  TH: ['think', 'thumb', 'the', 'that', 'this'],
  R: ['red', 'run', 'car', 'rock', 'rain'],
  S: ['sun', 'sit', 'bus', 'sat', 'see'],
  SH: ['ship', 'shoe', 'fish', 'wash', 'shop'],
  L: ['lip', 'look', 'ball', 'light', 'love'],
  'Short A': ['cat', 'hat', 'bat', 'mat', 'sat'],
  'Short I': ['sit', 'hit', 'pig', 'big', 'win'],
  'Short E': ['red', 'bed', 'led', 'pet', 'net'],
  F: ['fun', 'fish', 'off', 'four', 'fine'],
  V: ['van', 'vine', 'love', 'have', 'very'],
};

const WORD_TO_SOUND: Record<string, string> = {
  ...Object.fromEntries(Object.entries(SOUND_TO_WORDS).flatMap(([s, ws]) => ws.map((w) => [w, s]))),
  cat: 'Short A', hat: 'Short A', bat: 'Short A', mat: 'Short A', sat: 'Short A',
  red: 'Short E', bed: 'Short E', led: 'Short E',
  sit: 'Short I', hit: 'Short I',
};

/** IPA phonetics for practice words */
const WORD_TO_PHONETICS: Record<string, string> = {
  cat: '/kæt/', hat: '/hæt/', bat: '/bæt/', mat: '/mæt/', sat: '/sæt/',
  red: '/rɛd/', bed: '/bɛd/', led: '/lɛd/', pet: '/pɛt/', net: '/nɛt/',
  sit: '/sɪt/', hit: '/hɪt/', pig: '/pɪɡ/', big: '/bɪɡ/', win: '/wɪn/',
  think: '/θɪŋk/', thumb: '/θʌm/', the: '/ðə/', that: '/ðæt/', this: '/ðɪs/',
  run: '/rʌn/', car: '/kɑr/', rock: '/rɑk/', rain: '/reɪn/',
  sun: '/sʌn/', bus: '/bʌs/', see: '/si/',
  ship: '/ʃɪp/', shoe: '/ʃu/', fish: '/fɪʃ/', wash: '/wɑʃ/', shop: '/ʃɑp/',
  lip: '/lɪp/', look: '/lʊk/', ball: '/bɔl/', light: '/laɪt/', love: '/lʌv/',
  fun: '/fʌn/', off: '/ɔf/', four: '/fɔr/', fine: '/faɪn/',
  van: '/væn/', vine: '/vaɪn/', have: '/hæv/', very: '/ˈvɛri/',
};

function getPhonetics(word: string): string {
  return WORD_TO_PHONETICS[word.toLowerCase()] || '';
}

type ChatStep = 'name' | 'mode' | 'practice' | 'word' | 'complete';

function PracticePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const soundParam = searchParams.get('sound');
  const isDashboardEntry = !!(soundParam && SOUND_TO_WORDS[soundParam]);
  const [step, setStep] = useState<ChatStep>(isDashboardEntry ? 'word' : 'name');
  const [name, setName] = useState('');
  const [practiceWords, setPracticeWords] = useState<string[]>(
    isDashboardEntry && soundParam ? SOUND_TO_WORDS[soundParam] : DEFAULT_PRACTICE_WORDS
  );
  const [currentSound, setCurrentSound] = useState<string | null>(isDashboardEntry ? soundParam : null);
  const [messages, setMessages] = useState<{ from: 'phona' | 'user'; text: string }[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [lastScore, setLastScore] = useState<{ accuracy: number; syllables: string[] } | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [speechSupport, setSpeechSupport] = useState<boolean | null>(null);
  /** Visible status for diagnostics: Idle | Listening | No speech | Browser unsupported | Mic blocked */
  const [speechStatus, setSpeechStatus] = useState<'idle' | 'listening' | 'no-speech' | 'browser-unsupported' | 'mic-blocked'>('idle');
  // Diagnostic state: Mic Test, Input Level, Debug events
  const [micTestResult, setMicTestResult] = useState<string | null>(null);
  const [inputLevel, setInputLevel] = useState(0);
  const [inputLevelActive, setInputLevelActive] = useState(false);
  const [debugEvents, setDebugEvents] = useState<{ t: string; event: string }[]>([]);
  const [recState, setRecState] = useState<'Idle' | 'Listening' | 'Speech detected' | 'Ended' | 'Error'>('Idle');
  const [lastErrorCode, setLastErrorCode] = useState<string | null>(null);
  const [targetedMessage, setTargetedMessage] = useState<string | null>(null);
  const [audioDevices, setAudioDevices] = useState<string[]>([]);
  const [ttsRate, setTtsRate] = useState<'normal' | 'slow'>('normal');
  const [ttsFallback, setTtsFallback] = useState<string | null>(null);
  const [isDiagnosticsOpen, setIsDiagnosticsOpen] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const speechStartTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const noSpeechCountRef = useRef(0);
  // Web Speech API - SpeechRecognition instance (type not in standard lib)
  const recognitionRef = useRef<{ start(): void; stop(): void } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const addDebugEvent = useCallback((event: string) => {
    const t = new Date().toLocaleTimeString('en-US', { hour12: false });
    setDebugEvents((prev) => [...prev.slice(-9), { t, event }]);
  }, []);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages]);

  // Mic Test: getUserMedia (separate from SpeechRecognition) - checks raw mic access
  const runMicTest = useCallback(async () => {
    if (typeof window === 'undefined') return;
    setMicTestResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => t.stop());
      setMicTestResult('✅ Mic access OK');
    } catch (err: unknown) {
      const e = err as { name?: string; message?: string };
      setMicTestResult(`❌ ${e.name || 'Error'}: ${e.message || String(err)}. Check Windows mic privacy settings.`);
    }
  }, []);

  // Input Level Meter: Web Audio API - confirms mic is receiving sound
  const startInputLevelMeter = useCallback(async () => {
    if (typeof window === 'undefined') return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const ctx = new AudioContext();
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.5;
      src.connect(analyser);
      analyserRef.current = analyser;
      setInputLevelActive(true);
      const data = new Uint8Array(analyser.frequencyBinCount);
      let peak = 0;
      const tick = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        peak = Math.max(peak * 0.9, avg);
        setInputLevel(Math.round(peak));
        animationRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch (err: unknown) {
      const e = err as { name?: string; message?: string };
      setMicTestResult(`❌ ${e.name || 'Error'}: ${e.message || String(err)}`);
    }
  }, []);
  const stopInputLevelMeter = useCallback(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    analyserRef.current = null;
    setInputLevelActive(false);
    setInputLevel(0);
  }, []);
  useEffect(() => () => stopInputLevelMeter(), [stopInputLevelMeter]);

  // Persist diagnostics open state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('phona-diagnostics-open', String(isDiagnosticsOpen));
    } catch { /* ignore */ }
  }, [isDiagnosticsOpen]);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (localStorage.getItem('phona-diagnostics-open') === 'true') setIsDiagnosticsOpen(true);
    } catch { /* ignore */ }
  }, []);

  // Enumerate audio input devices (optional) - lists what browser detects
  useEffect(() => {
    if (typeof window === 'undefined' || !navigator.mediaDevices?.enumerateDevices) return;
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const inputs = devices.filter((d) => d.kind === 'audioinput').map((d) => d.label || d.deviceId.slice(0, 8));
      setAudioDevices(inputs);
    });
  }, []);

  // Browser support check: only run on client (typeof window)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: new () => SpeechRecognition }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognition }).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupport(true);
      setSpeechStatus('idle');
    } else {
      setSpeechSupport(false);
      setSpeechStatus('browser-unsupported');
      setTargetedMessage('Browser unsupported (use desktop Edge/Chrome).');
    }
  }, []);

  const speakPhona = useCallback(async (text: string) => {
    setMessages((m) => [...m, { from: 'phona', text }]);
    try {
      const res = await fetch('/api/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        await new Promise<void>((resolve, reject) => {
          audio.onended = () => {
            URL.revokeObjectURL(url);
            resolve();
          };
          audio.onerror = () => reject(new Error('Playback failed'));
          audio.play();
        });
      }
    } catch {
      // Fallback: no audio
    }
  }, []);

  // Dashboard → Practice: start session, load name, reset attemptCount
  const dashboardBypassDone = useRef(false);
  useEffect(() => {
    if (!isDashboardEntry || dashboardBypassDone.current) return;
    dashboardBypassDone.current = true;
    setAttemptCount(0);
    setCurrentWordIndex(0);
    try {
      const savedName = localStorage.getItem('phona-user-name');
      if (savedName) setName(savedName);
    } catch { /* ignore */ }
    (async () => {
      try {
        const res = await fetch('/api/sessions/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: getUserId(), mode: 'practice_words' }),
        });
        const data = await res.json();
        if (data.sessionId) setSessionId(data.sessionId);
      } catch (e) {
        console.error('Session start failed', e);
      }
    })();
  }, [isDashboardEntry]);

  const [isIntroAnimating, setIsIntroAnimating] = useState(true);
  const [isAwaitingName, setIsAwaitingName] = useState(false);
  const introCompletedRef = useRef(false);
  const nameSubmittedRef = useRef(false);
  useEffect(() => {
    if (introCompletedRef.current) return;
    if (isDashboardEntry) {
      introCompletedRef.current = true;
      setIsIntroAnimating(false);
      return;
    }
    const t = setTimeout(() => {
      introCompletedRef.current = true;
      setIsIntroAnimating(false);
      setIsAwaitingName(true);
      speakPhona("Hi, I'm Phona your phonetic speech assistant. It's nice to meet you! Before we get started what's your name?");
    }, 600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once; Strict Mode may double-invoke but timeout survives
  }, []);

  const handleNameSubmit = () => {
    if (nameSubmittedRef.current) return;
    nameSubmittedRef.current = true;
    const n = name.trim() || 'there';
    setName(n);
    setIsIntroAnimating(false);
    setIsAwaitingName(false);
    try { localStorage.setItem('phona-user-name', n); } catch { /* ignore */ }
    setMessages((m) => [...m, { from: 'user', text: n }, { from: 'phona', text: "Okay! Are you ready to start a tutorial?" }]);
    speakPhona("Okay! Are you ready to start a tutorial?");
    setStep('mode');
  };

  const handleContinueTutorial = async () => {
    setMessages((m) => [...m, { from: 'user', text: 'Continue with tutorial' }]);
    setPracticeWords(DEFAULT_PRACTICE_WORDS);
    setCurrentSound(null);
    await startSession();
    speakPhona(`Nice to meet you ${name || 'there'}! Let's start practicing some phonetics.`);
    setStep('word');
  };

  const handleSkipTutorial = () => {
    setMessages((m) => [...m, { from: 'user', text: 'Skip' }]);
    router.push('/dashboard');
  };

  const getUserId = () => {
    if (typeof window === 'undefined') return 'default';
    try {
      let uid = localStorage.getItem('phona-user-id');
      if (!uid) {
        uid = 'user-' + Math.random().toString(36).slice(2, 10);
        localStorage.setItem('phona-user-id', uid);
      }
      return uid;
    } catch { return 'default'; }
  };

  const startSession = async () => {
    try {
      const res = await fetch('/api/sessions/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: getUserId(), mode: 'practice_words' }),
      });
      const data = await res.json();
      if (data.sessionId) {
        setSessionId(data.sessionId);
        setAttemptCount(0);
      }
    } catch (e) {
      console.error('Session start failed', e);
    }
  };

  const scoreAndAdvance = useCallback(
    async (word: string, trans: string) => {
      const res = await fetch('/api/practice/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word,
          transcript: trans,
          sessionId: sessionId || undefined,
          userId: getUserId(),
          sound: WORD_TO_SOUND[word] || null,
          phonetics: getPhonetics(word) || null,
        }),
      });
      const data = await res.json();
      const count = data.attemptCount ?? attemptCount + 1;
      setAttemptCount(count);
      setLastScore({ accuracy: data.accuracy, syllables: data.syllables || [] });

      if (count >= 3) {
        if (sessionId) {
          await fetch('/api/sessions/end', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId }),
          });
        }
        await speakPhona(`Great job, ${name || 'there'}! You completed the tutorial.`);
        setStep('complete');
        return;
      }

      if (data.accuracy >= 90) {
        setFeedback('✅ Nice!');
        await speakPhona('Nice!');
        setLastScore(null);
        setTranscript('');
        if (currentWordIndex < practiceWords.length - 1) {
          setCurrentWordIndex((i) => i + 1);
          setTimeout(() => setFeedback(null), 1200);
        } else {
          setFeedback("You've completed all the words! Great job.");
          if (sessionId) {
            await fetch('/api/sessions/end', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ sessionId }),
            });
          }
        }
      } else if (data.tooNoisy) {
        const txt = "It seems too noisy here. Please try moving somewhere quieter.";
        setFeedback(txt);
        setTargetedMessage(txt);
        await speakPhona(txt);
      } else {
        const syll = (data.syllables || []).join(' - ');
        const txt = `Almost! Let's try it in syllables: ${syll}`;
        setFeedback(txt);
        await speakPhona(txt);
      }
    },
    [sessionId, currentWordIndex, speakPhona, attemptCount, name, router, currentSound]
  );

  // Web Speech API: ONLY called from user button click. Client-only (guarded).
  const startListening = useCallback(async () => {
    if (typeof window === 'undefined' || !speechSupport) return;

    setLastErrorCode(null);
    setTargetedMessage(null);

    // Microphone permission check (Permissions API - not all browsers support)
    if (navigator.permissions?.query) {
      try {
        const perm = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        if (perm.state === 'denied') {
          setSpeechStatus('mic-blocked');
          setTargetedMessage('Mic blocked or recognition not triggered by a user gesture.');
          return;
        }
      } catch {
        // Permissions API may not support 'microphone' - continue anyway
      }
    }

    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: new () => SpeechRecognition }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognition }).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setTargetedMessage('Browser unsupported (use desktop Edge/Chrome).');
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = 'en-US';
    rec.interimResults = true;
    rec.continuous = false;
    rec.maxAlternatives = 3;

    setTranscript('');
    setFeedback(null);
    setSpeechStatus('listening');
    setRecState('Listening');

    // ~5s timeout: if no onspeechstart, suggest mic/volume or noise
    speechStartTimeoutRef.current = setTimeout(() => {
      setRecState((s) => {
        if (s === 'Listening') {
          noSpeechCountRef.current += 1;
          const count = noSpeechCountRef.current;
          if (count >= 2) {
            setTargetedMessage('It seems too noisy here. Please try moving somewhere quieter, then tap Speak again.');
          } else {
            setTargetedMessage('No speech detected. Try speaking right after you tap Speak. If it\'s noisy, move somewhere quieter.');
          }
          setSpeechStatus('no-speech');
          return 'Error';
        }
        return s;
      });
    }, 5000);

    rec.onstart = () => {
      addDebugEvent('onstart');
      console.log('[SpeechRecognition] Listening started');
    };
    rec.onaudiostart = () => {
      addDebugEvent('onaudiostart');
      if (speechStartTimeoutRef.current) {
        clearTimeout(speechStartTimeoutRef.current);
        speechStartTimeoutRef.current = null;
      }
    };
    rec.onspeechstart = () => {
      addDebugEvent('onspeechstart');
      if (speechStartTimeoutRef.current) {
        clearTimeout(speechStartTimeoutRef.current);
        speechStartTimeoutRef.current = null;
      }
      setRecState('Speech detected');
    };
    rec.onspeechend = () => {
      addDebugEvent('onspeechend');
    };
    rec.onresult = (e: SpeechRecognitionEvent) => {
      addDebugEvent('onresult');
      noSpeechCountRef.current = 0; // Reset on successful recognition
      if (!e.results.length) return;
      // With interimResults, take the last final result
      let text = '';
      for (let i = e.results.length - 1; i >= 0; i--) {
        if (e.results[i].isFinal) {
          text = e.results[i][0]?.transcript?.trim() || '';
          break;
        }
      }
      if (!text) text = e.results[0][0]?.transcript?.trim() || '';
      if (!text) return;
      setTranscript(text);
      setSpeechStatus('idle');
      setRecState('Ended');
      const word = practiceWords[currentWordIndex];
      scoreAndAdvance(word, text);
    };
    rec.onend = () => {
      addDebugEvent('onend');
      if (speechStartTimeoutRef.current) {
        clearTimeout(speechStartTimeoutRef.current);
        speechStartTimeoutRef.current = null;
      }
      setIsListening(false);
      recognitionRef.current = null;
      setRecState((s) => (s === 'Listening' ? 'Ended' : s));
      setSpeechStatus((s) => (s === 'listening' ? 'idle' : s));
    };
    rec.onerror = (e: Event & { error?: string }) => {
      const err = (e as { error?: string }).error;
      addDebugEvent(`onerror: ${err || 'unknown'}`);
      setLastErrorCode(err || 'unknown');
      console.error('[SpeechRecognition] Error:', err, (e as ErrorEvent).message || '');
      setIsListening(false);
      recognitionRef.current = null;
      setRecState('Error');
      if (err === 'not-allowed') {
        setSpeechStatus('mic-blocked');
        setTargetedMessage('Mic blocked or recognition not triggered by a user gesture.');
      } else if (err === 'network' || err === 'service-not-allowed') {
        setTargetedMessage('Speech recognition requires internet; firewall/VPN may block it.');
      } else if (err === 'no-speech') {
        setSpeechStatus('no-speech');
        setTargetedMessage('No speech detected. Try speaking right after you tap Speak, increase mic volume, or switch to a different microphone.');
      } else if (err !== 'aborted') {
        setSpeechStatus('idle');
        setTargetedMessage('Could not hear clearly. Try again. If it\'s noisy, move somewhere quieter.');
      }
    };

    recognitionRef.current = rec;
    // recognition.start() ONLY triggered by user click (this fn is button handler)
    rec.start();
    setIsListening(true);
  }, [currentWordIndex, practiceWords, speechSupport, scoreAndAdvance, addDebugEvent]);

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
  };

  const handleRetry = () => {
    setLastScore(null);
    setFeedback(null);
    setTranscript('');
    setSpeechStatus('idle');
    startListening();
  };

  // Play word: browser TTS (speechSynthesis) - hear target word pronounced
  const playWord = useCallback((word: string) => {
    if (typeof window === 'undefined') return;
    if (!window.speechSynthesis) {
      setTtsFallback('Text-to-speech is not supported in this browser.');
      return;
    }
    setTtsFallback(null);
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(word);
    u.lang = 'en-US';
    u.rate = ttsRate === 'slow' ? 0.7 : 1;
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find((v) => v.lang.startsWith('en') && v.name.toLowerCase().includes('female'))
      || voices.find((v) => v.lang.startsWith('en'))
      || voices[0];
    if (enVoice) u.voice = enVoice;
    window.speechSynthesis.speak(u);
  }, [ttsRate]);

  // Load voices (Chrome needs this to populate getVoices)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const load = () => window.speechSynthesis.getVoices();
    load();
    window.speechSynthesis.onvoiceschanged = load;
  }, []);

  const currentWord = practiceWords[currentWordIndex];

  return (
    <div className="app-container">
      <div className="flex-1 flex flex-col">
        <div className="phona-header">
          <Link href="/" className="phona-logo-link" aria-label="Back to Home">
            <Image src="/phoneticallylogo.png" alt="Phonetically" width={96} height={96} className="phona-header-logo" priority />
          </Link>
          {step === 'word' ? (
            <div className="phona-tutorial-progress-wrap phona-header-progress">
              <div className="phona-tutorial-progress-bar">
                <div
                  className="phona-tutorial-progress-fill"
                  style={{ width: `${Math.min(100, (attemptCount / 3) * 100)}%` }}
                />
              </div>
              <span className="phona-tutorial-progress-label">{attemptCount}/3</span>
            </div>
          ) : (
            <div />
          )}
        </div>
        <div className="app-content-scroll phona-practice-fixed">
          <div className="content-wrapper max-w-2xl mx-auto w-full p-8">

            <div className={step === 'word' || step === 'complete' ? 'phona-fresh-container' : 'phona-chat'}>
            {step !== 'word' && step !== 'complete' && messages
              .filter((msg, i) => !(i > 0 && msg.from === messages[i - 1].from && msg.text === messages[i - 1].text))
              .map((msg, i) => (
              <div
                key={i}
                className={`phona-message-wrap ${msg.from === 'phona' ? 'phona-message-wrap-bot' : 'phona-message-wrap-user'}`}
              >
                {msg.from === 'phona' && (
                  <div className="phona-avatar" aria-hidden>
                    <Image src="/phoneticallylogo.png" alt="" width={36} height={36} />
                  </div>
                )}
                <div
                  className={`phona-message phona-message-enter ${msg.from === 'phona' ? 'phona-message-bot' : 'phona-message-user'}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {step === 'name' && isIntroAnimating && (
              <div className="phona-message-wrap phona-message-wrap-bot">
                <div className="phona-avatar" aria-hidden>
                  <Image src="/phoneticallylogo.png" alt="" width={36} height={36} />
                </div>
                <div className="phona-typing-indicator">
                  <span className="phona-typing-dot" />
                  <span className="phona-typing-dot" />
                  <span className="phona-typing-dot" />
                </div>
              </div>
            )}

            {step === 'name' && isAwaitingName && (
              <div className="phona-input-section">
                <div className="phona-input-row">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="glass-input phona-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                  />
                  <button type="button" onClick={handleNameSubmit} className="glass-button phona-send" aria-label="Send">
                    Send
                  </button>
                </div>
                <p className="phona-input-hint">Enter your name to get started</p>
              </div>
            )}

            {step === 'mode' && (
              <div className="phona-tutorial-options">
                  <button
                    type="button"
                    onClick={handleContinueTutorial}
                    className="glass-button phona-option-btn phona-option-primary"
                  >
                    Continue with tutorial
                  </button>
                  <button
                    type="button"
                    onClick={handleSkipTutorial}
                    className="glass-button phona-option-btn phona-option-secondary"
                  >
                  Skip
                </button>
              </div>
            )}

            {step === 'complete' && (
              <div className="phona-complete-view">
                <div className="phona-complete-message">
                  <h2 className="phona-complete-title">Great job, {name || 'there'}!</h2>
                  <p className="phona-complete-subtitle">
                    You completed the voice tutorial. Head to your dashboard to pick sounds and keep practicing.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => router.push('/dashboard')}
                  className="glass-button phona-continue-btn"
                >
                  Continue to Dashboard
                </button>
              </div>
            )}

            {step === 'word' && currentWord && (
              <div className="phona-fresh-view">
                <div className="phona-target-row">
                  <div className="phona-target-word-wrap">
                    <div className="phona-target-word-center">{currentWord}</div>
                    {getPhonetics(currentWord) && (
                      <div className="phona-target-phonetics">{getPhonetics(currentWord)}</div>
                    )}
                  </div>
                  <div className="phona-play-section">
                    <button
                      type="button"
                      onClick={() => playWord(currentWord)}
                      className="glass-button phona-play-btn"
                      title="Hear the word"
                    >
                      <Volume2 size={24} />
                      Play
                    </button>
                    <div className="phona-rate-toggle">
                      <button
                        type="button"
                        onClick={() => setTtsRate('normal')}
                        className={`phona-rate-btn ${ttsRate === 'normal' ? 'phona-rate-active' : ''}`}
                      >
                        Normal
                      </button>
                      <button
                        type="button"
                        onClick={() => setTtsRate('slow')}
                        className={`phona-rate-btn ${ttsRate === 'slow' ? 'phona-rate-active' : ''}`}
                      >
                        Slow
                      </button>
                    </div>
                  </div>
                </div>
                {ttsFallback && <div className="phona-tts-fallback">{ttsFallback}</div>}
                {/* Practice Zone: status (Idle, Listening, etc.) on top, feedback below */}
                {(() => {
                  const statusText =
                    speechStatus === 'browser-unsupported'
                      ? 'Speech recognition is not supported in this browser. Please use Chrome or Edge.'
                      : speechStatus === 'mic-blocked'
                        ? 'Microphone access is blocked. Please enable it in browser settings.'
                        : speechStatus === 'no-speech'
                          ? 'No speech detected'
                          : recState === 'Speech detected'
                            ? 'Speech detected'
                            : speechStatus === 'listening'
                              ? 'Listening...'
                              : recState === 'Error'
                                ? 'Error'
                                : 'Idle';
                  const statusVariant = recState === 'Speech detected'
                    ? 'success'
                    : speechStatus === 'listening'
                      ? 'listening'
                      : (speechStatus === 'no-speech' || speechStatus === 'browser-unsupported' || speechStatus === 'mic-blocked' || recState === 'Error')
                        ? 'error'
                        : 'idle';
                  return (
                    <div className="phona-status-wrap" role="status" aria-live="polite">
                      <div className={`phona-status phona-status-${statusVariant}`}>{statusText}</div>
                      {feedback && <div className="phona-feedback">{feedback}</div>}
                    </div>
                  );
                })()}

                {speechSupport !== false && (
                  <>
                    <div className="phona-speak-tip">Tip: Tap Speak and start talking right away.</div>
                    <button
                      type="button"
                      onClick={isListening ? stopListening : startListening}
                      className={`phona-mic-large ${isListening ? 'phona-mic-listening' : ''}`}
                    >
                      <Mic size={36} strokeWidth={2} />
                      <span className="phona-mic-label">Speak</span>
                    </button>
                  </>
                )}

                {lastScore && lastScore.accuracy < 90 && (
                  <button type="button" onClick={handleRetry} className="glass-button phona-retry">
                    Try again
                  </button>
                )}
              </div>
            )}

            {/* Floating Diagnostics: toggle button + expandable panel (only on practice step) */}
            {step === 'word' && (
              <div className="phona-diagnostics-float">
                <button
                  type="button"
                  onClick={() => setIsDiagnosticsOpen((o) => !o)}
                  className={`phona-diagnostics-toggle ${isDiagnosticsOpen ? 'phona-diagnostics-toggle-open' : ''}`}
                >
                  <Settings2 size={18} />
                  Diagnostics
                </button>
                <div className={`phona-diagnostics-panel ${isDiagnosticsOpen ? 'phona-diagnostics-panel-open' : ''}`}>
                  <div className="phona-diagnostics-header-row">
                    <span className="phona-diagnostics-header">Speech Diagnostics</span>
                    <button
                      type="button"
                      onClick={() => setIsDiagnosticsOpen(false)}
                      className="phona-diagnostics-close"
                      aria-label="Close"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className="phona-diagnostics-body">
                    <div className="phona-diagnostic-row">
                      <button type="button" onClick={runMicTest} className="glass-button phona-diagnostic-btn">
                        Mic Test
                      </button>
                      {micTestResult && <span className="phona-diagnostic-result">{micTestResult}</span>}
                    </div>
                    <div className="phona-diagnostic-row">
                      <button
                        type="button"
                        onClick={inputLevelActive ? stopInputLevelMeter : startInputLevelMeter}
                        className="glass-button phona-diagnostic-btn"
                      >
                        {inputLevelActive ? 'Stop Meter' : 'Input Level Meter'}
                      </button>
                      {inputLevelActive && (
                        <>
                          <div className="phona-level-bar">
                            <div className="phona-level-fill" style={{ width: `${Math.min(100, inputLevel * 2)}%` }} />
                          </div>
                          <span className="phona-level-value">{inputLevel}</span>
                          {inputLevel < 5 && (
                            <span className="phona-diagnostic-warn">Mic not receiving audio—check input device.</span>
                          )}
                        </>
                      )}
                    </div>
                    <div className="phona-debug-panel">
                      <div className="phona-debug-row">
                        <span className="phona-debug-label">Status:</span>
                        <span className="phona-debug-value">{recState}</span>
                      </div>
                      {lastErrorCode && (
                        <div className="phona-debug-row">
                          <span className="phona-debug-label">Last issue:</span>
                          <span className="phona-debug-value phona-debug-error">{lastErrorCode}</span>
                        </div>
                      )}
                      {targetedMessage && <div className="phona-targeted-msg">{targetedMessage}</div>}
                      <div className="phona-debug-events">
                        {debugEvents.slice(-10).map((ev, i) => (
                          <div key={i} className="phona-debug-event">[{ev.t}] {ev.event}</div>
                        ))}
                      </div>
                    </div>
                    <div className="phona-device-guidance">
                      <strong>Mic selection:</strong> Edge address bar → lock icon → Site permissions → Microphone. Or Windows Settings → Sound → Input device.
                      {audioDevices.length > 0 && (
                        <div className="phona-device-list">Detected inputs: {audioDevices.join(', ') || 'none'}</div>
                      )}
                    </div>
                    <div className="phona-interpret-note">
                      <strong>How to interpret:</strong>
                      <ul className="phona-interpret-list">
                        <li>Mic Test fails → microphone permissions or Windows privacy settings</li>
                        <li>Meter moves but no speech events → SpeechRecognition service/network may be blocked</li>
                        <li>Meter flat → wrong input device or muted mic</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PracticePage() {
  return (
    <Suspense fallback={
      <div className="app-container">
        <div className="phona-header">
          <Link href="/" className="phona-logo-link" aria-label="Back to Home">
            <Image src="/phoneticallylogo.png" alt="Phonetically" width={96} height={96} className="phona-header-logo" priority />
          </Link>
          <div />
        </div>
        <div className="app-content-scroll phona-practice-fixed">
          <div className="content-wrapper max-w-2xl mx-auto w-full p-8">
            <p className="text-white/60">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <PracticePageContent />
    </Suspense>
  );
}
