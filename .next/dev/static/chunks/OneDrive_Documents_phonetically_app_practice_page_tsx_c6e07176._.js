(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/OneDrive/Documents/phonetically/app/practice/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PracticePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/phonetically/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/phonetically/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/phonetically/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/phonetically/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/phonetically/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/OneDrive/Documents/phonetically/node_modules/lucide-react/dist/esm/icons/mic.js [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__ = __turbopack_context__.i("[project]/OneDrive/Documents/phonetically/node_modules/lucide-react/dist/esm/icons/volume-2.js [app-client] (ecmascript) <export default as Volume2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__ = __turbopack_context__.i("[project]/OneDrive/Documents/phonetically/node_modules/lucide-react/dist/esm/icons/settings-2.js [app-client] (ecmascript) <export default as Settings2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/OneDrive/Documents/phonetically/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
;
var _s = __turbopack_context__.k.signature();
/**
 * Phona pronunciation practice page (after login)
 * Chat-style UI, Web Speech API for speech recognition, accuracy threshold 90%
 */ 'use client';
;
;
;
;
;
const DEFAULT_PRACTICE_WORDS = [
    'cat',
    'hat',
    'bat',
    'mat',
    'sat',
    'red',
    'bed',
    'led',
    'sit',
    'hit'
];
/** Word lists per phonetic category (Dashboard → Practice) */ const SOUND_TO_WORDS = {
    TH: [
        'think',
        'thumb',
        'the',
        'that',
        'this'
    ],
    R: [
        'red',
        'run',
        'car',
        'rock',
        'rain'
    ],
    S: [
        'sun',
        'sit',
        'bus',
        'sat',
        'see'
    ],
    SH: [
        'ship',
        'shoe',
        'fish',
        'wash',
        'shop'
    ],
    L: [
        'lip',
        'look',
        'ball',
        'light',
        'love'
    ],
    'Short A': [
        'cat',
        'hat',
        'bat',
        'mat',
        'sat'
    ],
    'Short I': [
        'sit',
        'hit',
        'pig',
        'big',
        'win'
    ],
    'Short E': [
        'red',
        'bed',
        'led',
        'pet',
        'net'
    ],
    F: [
        'fun',
        'fish',
        'off',
        'four',
        'fine'
    ],
    V: [
        'van',
        'vine',
        'love',
        'have',
        'very'
    ]
};
const WORD_TO_SOUND = {
    ...Object.fromEntries(Object.entries(SOUND_TO_WORDS).flatMap(([s, ws])=>ws.map((w)=>[
                w,
                s
            ]))),
    cat: 'Short A',
    hat: 'Short A',
    bat: 'Short A',
    mat: 'Short A',
    sat: 'Short A',
    red: 'Short E',
    bed: 'Short E',
    led: 'Short E',
    sit: 'Short I',
    hit: 'Short I'
};
/** IPA phonetics for practice words */ const WORD_TO_PHONETICS = {
    cat: '/kæt/',
    hat: '/hæt/',
    bat: '/bæt/',
    mat: '/mæt/',
    sat: '/sæt/',
    red: '/rɛd/',
    bed: '/bɛd/',
    led: '/lɛd/',
    pet: '/pɛt/',
    net: '/nɛt/',
    sit: '/sɪt/',
    hit: '/hɪt/',
    pig: '/pɪɡ/',
    big: '/bɪɡ/',
    win: '/wɪn/',
    think: '/θɪŋk/',
    thumb: '/θʌm/',
    the: '/ðə/',
    that: '/ðæt/',
    this: '/ðɪs/',
    run: '/rʌn/',
    car: '/kɑr/',
    rock: '/rɑk/',
    rain: '/reɪn/',
    sun: '/sʌn/',
    bus: '/bʌs/',
    see: '/si/',
    ship: '/ʃɪp/',
    shoe: '/ʃu/',
    fish: '/fɪʃ/',
    wash: '/wɑʃ/',
    shop: '/ʃɑp/',
    lip: '/lɪp/',
    look: '/lʊk/',
    ball: '/bɔl/',
    light: '/laɪt/',
    love: '/lʌv/',
    fun: '/fʌn/',
    off: '/ɔf/',
    four: '/fɔr/',
    fine: '/faɪn/',
    van: '/væn/',
    vine: '/vaɪn/',
    have: '/hæv/',
    very: '/ˈvɛri/'
};
function getPhonetics(word) {
    return WORD_TO_PHONETICS[word.toLowerCase()] || '';
}
function PracticePageContent() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const soundParam = searchParams.get('sound');
    const isDashboardEntry = !!(soundParam && SOUND_TO_WORDS[soundParam]);
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(isDashboardEntry ? 'word' : 'name');
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [practiceWords, setPracticeWords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(isDashboardEntry && soundParam ? SOUND_TO_WORDS[soundParam] : DEFAULT_PRACTICE_WORDS);
    const [currentSound, setCurrentSound] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(isDashboardEntry ? soundParam : null);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentWordIndex, setCurrentWordIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [transcript, setTranscript] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isListening, setIsListening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lastScore, setLastScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [feedback, setFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sessionId, setSessionId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [attemptCount, setAttemptCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [speechSupport, setSpeechSupport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    /** Visible status for diagnostics: Idle | Listening | No speech | Browser unsupported | Mic blocked */ const [speechStatus, setSpeechStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle');
    // Diagnostic state: Mic Test, Input Level, Debug events
    const [micTestResult, setMicTestResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [inputLevel, setInputLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [inputLevelActive, setInputLevelActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [debugEvents, setDebugEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [recState, setRecState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Idle');
    const [lastErrorCode, setLastErrorCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [targetedMessage, setTargetedMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [audioDevices, setAudioDevices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [ttsRate, setTtsRate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('normal');
    const [ttsFallback, setTtsFallback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isDiagnosticsOpen, setIsDiagnosticsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const streamRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const analyserRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const animationRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const speechStartTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const noSpeechCountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    // Web Speech API - SpeechRecognition instance (type not in standard lib)
    const recognitionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const addDebugEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PracticePageContent.useCallback[addDebugEvent]": (event)=>{
            const t = new Date().toLocaleTimeString('en-US', {
                hour12: false
            });
            setDebugEvents({
                "PracticePageContent.useCallback[addDebugEvent]": (prev)=>[
                        ...prev.slice(-9),
                        {
                            t,
                            event
                        }
                    ]
            }["PracticePageContent.useCallback[addDebugEvent]"]);
        }
    }["PracticePageContent.useCallback[addDebugEvent]"], []);
    const scrollToBottom = ()=>messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PracticePageContent.useEffect": ()=>{
            scrollToBottom();
        }
    }["PracticePageContent.useEffect"], [
        messages
    ]);
    // Mic Test: getUserMedia (separate from SpeechRecognition) - checks raw mic access
    const runMicTest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PracticePageContent.useCallback[runMicTest]": async ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            setMicTestResult(null);
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true
                });
                stream.getTracks().forEach({
                    "PracticePageContent.useCallback[runMicTest]": (t)=>t.stop()
                }["PracticePageContent.useCallback[runMicTest]"]);
                setMicTestResult('✅ Mic access OK');
            } catch (err) {
                const e = err;
                setMicTestResult(`❌ ${e.name || 'Error'}: ${e.message || String(err)}. Check Windows mic privacy settings.`);
            }
        }
    }["PracticePageContent.useCallback[runMicTest]"], []);
    // Input Level Meter: Web Audio API - confirms mic is receiving sound
    const startInputLevelMeter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PracticePageContent.useCallback[startInputLevelMeter]": async ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true
                });
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
                const tick = {
                    "PracticePageContent.useCallback[startInputLevelMeter].tick": ()=>{
                        if (!analyserRef.current) return;
                        analyserRef.current.getByteFrequencyData(data);
                        const avg = data.reduce({
                            "PracticePageContent.useCallback[startInputLevelMeter].tick": (a, b)=>a + b
                        }["PracticePageContent.useCallback[startInputLevelMeter].tick"], 0) / data.length;
                        peak = Math.max(peak * 0.9, avg);
                        setInputLevel(Math.round(peak));
                        animationRef.current = requestAnimationFrame(tick);
                    }
                }["PracticePageContent.useCallback[startInputLevelMeter].tick"];
                tick();
            } catch (err) {
                const e = err;
                setMicTestResult(`❌ ${e.name || 'Error'}: ${e.message || String(err)}`);
            }
        }
    }["PracticePageContent.useCallback[startInputLevelMeter]"], []);
    const stopInputLevelMeter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PracticePageContent.useCallback[stopInputLevelMeter]": ()=>{
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            streamRef.current?.getTracks().forEach({
                "PracticePageContent.useCallback[stopInputLevelMeter]": (t)=>t.stop()
            }["PracticePageContent.useCallback[stopInputLevelMeter]"]);
            streamRef.current = null;
            analyserRef.current = null;
            setInputLevelActive(false);
            setInputLevel(0);
        }
    }["PracticePageContent.useCallback[stopInputLevelMeter]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PracticePageContent.useEffect": ()=>({
                "PracticePageContent.useEffect": ()=>stopInputLevelMeter()
            })["PracticePageContent.useEffect"]
    }["PracticePageContent.useEffect"], [
        stopInputLevelMeter
    ]);
    // Persist diagnostics open state to localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PracticePageContent.useEffect": ()=>{
            try {
                localStorage.setItem('phona-diagnostics-open', String(isDiagnosticsOpen));
            } catch  {}
        }
    }["PracticePageContent.useEffect"], [
        isDiagnosticsOpen
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PracticePageContent.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            try {
                if (localStorage.getItem('phona-diagnostics-open') === 'true') setIsDiagnosticsOpen(true);
            } catch  {}
        }
    }["PracticePageContent.useEffect"], []);
    // Enumerate audio input devices (optional) - lists what browser detects
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PracticePageContent.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") === 'undefined' || !navigator.mediaDevices?.enumerateDevices) return;
            navigator.mediaDevices.enumerateDevices().then({
                "PracticePageContent.useEffect": (devices)=>{
                    const inputs = devices.filter({
                        "PracticePageContent.useEffect.inputs": (d)=>d.kind === 'audioinput'
                    }["PracticePageContent.useEffect.inputs"]).map({
                        "PracticePageContent.useEffect.inputs": (d)=>d.label || d.deviceId.slice(0, 8)
                    }["PracticePageContent.useEffect.inputs"]);
                    setAudioDevices(inputs);
                }
            }["PracticePageContent.useEffect"]);
        }
    }["PracticePageContent.useEffect"], []);
    // Browser support check: only run on client (typeof window)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PracticePageContent.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                setSpeechSupport(true);
                setSpeechStatus('idle');
            } else {
                setSpeechSupport(false);
                setSpeechStatus('browser-unsupported');
                setTargetedMessage('Browser unsupported (use desktop Edge/Chrome).');
            }
        }
    }["PracticePageContent.useEffect"], []);
    const speakPhona = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PracticePageContent.useCallback[speakPhona]": async (text)=>{
            setMessages({
                "PracticePageContent.useCallback[speakPhona]": (m)=>[
                        ...m,
                        {
                            from: 'phona',
                            text
                        }
                    ]
            }["PracticePageContent.useCallback[speakPhona]"]);
            try {
                const res = await fetch('/api/speak', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        text
                    })
                });
                if (res.ok) {
                    const blob = await res.blob();
                    const url = URL.createObjectURL(blob);
                    const audio = new Audio(url);
                    await new Promise({
                        "PracticePageContent.useCallback[speakPhona]": (resolve, reject)=>{
                            audio.onended = ({
                                "PracticePageContent.useCallback[speakPhona]": ()=>{
                                    URL.revokeObjectURL(url);
                                    resolve();
                                }
                            })["PracticePageContent.useCallback[speakPhona]"];
                            audio.onerror = ({
                                "PracticePageContent.useCallback[speakPhona]": ()=>reject(new Error('Playback failed'))
                            })["PracticePageContent.useCallback[speakPhona]"];
                            audio.play();
                        }
                    }["PracticePageContent.useCallback[speakPhona]"]);
                }
            } catch  {
            // Fallback: no audio
            }
        }
    }["PracticePageContent.useCallback[speakPhona]"], []);
    // Dashboard → Practice: start session, load name, reset attemptCount
    const dashboardBypassDone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PracticePageContent.useEffect": ()=>{
            if (!isDashboardEntry || dashboardBypassDone.current) return;
            dashboardBypassDone.current = true;
            setAttemptCount(0);
            setCurrentWordIndex(0);
            try {
                const savedName = localStorage.getItem('phona-user-name');
                if (savedName) setName(savedName);
            } catch  {}
            ({
                "PracticePageContent.useEffect": async ()=>{
                    try {
                        const res = await fetch('/api/sessions/start', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                userId: getUserId(),
                                mode: 'practice_words'
                            })
                        });
                        const data = await res.json();
                        if (data.sessionId) setSessionId(data.sessionId);
                    } catch (e) {
                        console.error('Session start failed', e);
                    }
                }
            })["PracticePageContent.useEffect"]();
        }
    }["PracticePageContent.useEffect"], [
        isDashboardEntry
    ]);
    const [isIntroAnimating, setIsIntroAnimating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isAwaitingName, setIsAwaitingName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const introCompletedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const nameSubmittedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PracticePageContent.useEffect": ()=>{
            if (introCompletedRef.current) return;
            if (isDashboardEntry) {
                introCompletedRef.current = true;
                setIsIntroAnimating(false);
                return;
            }
            const t = setTimeout({
                "PracticePageContent.useEffect.t": ()=>{
                    introCompletedRef.current = true;
                    setIsIntroAnimating(false);
                    setIsAwaitingName(true);
                    speakPhona("Hi, I'm Phona your phonetic speech assistant. It's nice to meet you! Before we get started what's your name?");
                }
            }["PracticePageContent.useEffect.t"], 600);
            return ({
                "PracticePageContent.useEffect": ()=>clearTimeout(t)
            })["PracticePageContent.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps -- run once; Strict Mode may double-invoke but timeout survives
        }
    }["PracticePageContent.useEffect"], []);
    const handleNameSubmit = ()=>{
        if (nameSubmittedRef.current) return;
        nameSubmittedRef.current = true;
        const n = name.trim() || 'there';
        setName(n);
        setIsIntroAnimating(false);
        setIsAwaitingName(false);
        try {
            localStorage.setItem('phona-user-name', n);
        } catch  {}
        setMessages((m)=>[
                ...m,
                {
                    from: 'user',
                    text: n
                },
                {
                    from: 'phona',
                    text: "Okay! Are you ready to start a tutorial?"
                }
            ]);
        speakPhona("Okay! Are you ready to start a tutorial?");
        setStep('mode');
    };
    const handleContinueTutorial = async ()=>{
        setMessages((m)=>[
                ...m,
                {
                    from: 'user',
                    text: 'Continue with tutorial'
                }
            ]);
        setPracticeWords(DEFAULT_PRACTICE_WORDS);
        setCurrentSound(null);
        await startSession();
        speakPhona(`Nice to meet you ${name || 'there'}! Let's start practicing some phonetics.`);
        setStep('word');
    };
    const handleSkipTutorial = ()=>{
        setMessages((m)=>[
                ...m,
                {
                    from: 'user',
                    text: 'Skip'
                }
            ]);
        router.push('/dashboard');
    };
    const getUserId = ()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            let uid = localStorage.getItem('phona-user-id');
            if (!uid) {
                uid = 'user-' + Math.random().toString(36).slice(2, 10);
                localStorage.setItem('phona-user-id', uid);
            }
            return uid;
        } catch  {
            return 'default';
        }
    };
    const startSession = async ()=>{
        try {
            const res = await fetch('/api/sessions/start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: getUserId(),
                    mode: 'practice_words'
                })
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
    const scoreAndAdvance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PracticePageContent.useCallback[scoreAndAdvance]": async (word, trans)=>{
            const res = await fetch('/api/practice/score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    word,
                    transcript: trans,
                    sessionId: sessionId || undefined,
                    userId: getUserId(),
                    sound: WORD_TO_SOUND[word] || null,
                    phonetics: getPhonetics(word) || null
                })
            });
            const data = await res.json();
            const count = data.attemptCount ?? attemptCount + 1;
            setAttemptCount(count);
            setLastScore({
                accuracy: data.accuracy,
                syllables: data.syllables || []
            });
            if (count >= 3) {
                if (sessionId) {
                    await fetch('/api/sessions/end', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            sessionId
                        })
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
                    setCurrentWordIndex({
                        "PracticePageContent.useCallback[scoreAndAdvance]": (i)=>i + 1
                    }["PracticePageContent.useCallback[scoreAndAdvance]"]);
                    setTimeout({
                        "PracticePageContent.useCallback[scoreAndAdvance]": ()=>setFeedback(null)
                    }["PracticePageContent.useCallback[scoreAndAdvance]"], 1200);
                } else {
                    setFeedback("You've completed all the words! Great job.");
                    if (sessionId) {
                        await fetch('/api/sessions/end', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                sessionId
                            })
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
        }
    }["PracticePageContent.useCallback[scoreAndAdvance]"], [
        sessionId,
        currentWordIndex,
        speakPhona,
        attemptCount,
        name,
        router,
        currentSound
    ]);
    // Web Speech API: ONLY called from user button click. Client-only (guarded).
    const startListening = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PracticePageContent.useCallback[startListening]": async ()=>{
            if (("TURBOPACK compile-time value", "object") === 'undefined' || !speechSupport) return;
            setLastErrorCode(null);
            setTargetedMessage(null);
            // Microphone permission check (Permissions API - not all browsers support)
            if (navigator.permissions?.query) {
                try {
                    const perm = await navigator.permissions.query({
                        name: 'microphone'
                    });
                    if (perm.state === 'denied') {
                        setSpeechStatus('mic-blocked');
                        setTargetedMessage('Mic blocked or recognition not triggered by a user gesture.');
                        return;
                    }
                } catch  {
                // Permissions API may not support 'microphone' - continue anyway
                }
            }
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
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
            speechStartTimeoutRef.current = setTimeout({
                "PracticePageContent.useCallback[startListening]": ()=>{
                    setRecState({
                        "PracticePageContent.useCallback[startListening]": (s)=>{
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
                        }
                    }["PracticePageContent.useCallback[startListening]"]);
                }
            }["PracticePageContent.useCallback[startListening]"], 5000);
            rec.onstart = ({
                "PracticePageContent.useCallback[startListening]": ()=>{
                    addDebugEvent('onstart');
                    console.log('[SpeechRecognition] Listening started');
                }
            })["PracticePageContent.useCallback[startListening]"];
            rec.onaudiostart = ({
                "PracticePageContent.useCallback[startListening]": ()=>{
                    addDebugEvent('onaudiostart');
                    if (speechStartTimeoutRef.current) {
                        clearTimeout(speechStartTimeoutRef.current);
                        speechStartTimeoutRef.current = null;
                    }
                }
            })["PracticePageContent.useCallback[startListening]"];
            rec.onspeechstart = ({
                "PracticePageContent.useCallback[startListening]": ()=>{
                    addDebugEvent('onspeechstart');
                    if (speechStartTimeoutRef.current) {
                        clearTimeout(speechStartTimeoutRef.current);
                        speechStartTimeoutRef.current = null;
                    }
                    setRecState('Speech detected');
                }
            })["PracticePageContent.useCallback[startListening]"];
            rec.onspeechend = ({
                "PracticePageContent.useCallback[startListening]": ()=>{
                    addDebugEvent('onspeechend');
                }
            })["PracticePageContent.useCallback[startListening]"];
            rec.onresult = ({
                "PracticePageContent.useCallback[startListening]": (e)=>{
                    addDebugEvent('onresult');
                    noSpeechCountRef.current = 0; // Reset on successful recognition
                    if (!e.results.length) return;
                    // With interimResults, take the last final result
                    let text = '';
                    for(let i = e.results.length - 1; i >= 0; i--){
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
                }
            })["PracticePageContent.useCallback[startListening]"];
            rec.onend = ({
                "PracticePageContent.useCallback[startListening]": ()=>{
                    addDebugEvent('onend');
                    if (speechStartTimeoutRef.current) {
                        clearTimeout(speechStartTimeoutRef.current);
                        speechStartTimeoutRef.current = null;
                    }
                    setIsListening(false);
                    recognitionRef.current = null;
                    setRecState({
                        "PracticePageContent.useCallback[startListening]": (s)=>s === 'Listening' ? 'Ended' : s
                    }["PracticePageContent.useCallback[startListening]"]);
                    setSpeechStatus({
                        "PracticePageContent.useCallback[startListening]": (s)=>s === 'listening' ? 'idle' : s
                    }["PracticePageContent.useCallback[startListening]"]);
                }
            })["PracticePageContent.useCallback[startListening]"];
            rec.onerror = ({
                "PracticePageContent.useCallback[startListening]": (e)=>{
                    const err = e.error;
                    addDebugEvent(`onerror: ${err || 'unknown'}`);
                    setLastErrorCode(err || 'unknown');
                    console.error('[SpeechRecognition] Error:', err, e.message || '');
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
                }
            })["PracticePageContent.useCallback[startListening]"];
            recognitionRef.current = rec;
            // recognition.start() ONLY triggered by user click (this fn is button handler)
            rec.start();
            setIsListening(true);
        }
    }["PracticePageContent.useCallback[startListening]"], [
        currentWordIndex,
        practiceWords,
        speechSupport,
        scoreAndAdvance,
        addDebugEvent
    ]);
    const stopListening = ()=>{
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            recognitionRef.current = null;
        }
    };
    const handleRetry = ()=>{
        setLastScore(null);
        setFeedback(null);
        setTranscript('');
        setSpeechStatus('idle');
        startListening();
    };
    // Play word: browser TTS (speechSynthesis) - hear target word pronounced
    const playWord = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PracticePageContent.useCallback[playWord]": (word)=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
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
            const enVoice = voices.find({
                "PracticePageContent.useCallback[playWord]": (v)=>v.lang.startsWith('en') && v.name.toLowerCase().includes('female')
            }["PracticePageContent.useCallback[playWord]"]) || voices.find({
                "PracticePageContent.useCallback[playWord]": (v)=>v.lang.startsWith('en')
            }["PracticePageContent.useCallback[playWord]"]) || voices[0];
            if (enVoice) u.voice = enVoice;
            window.speechSynthesis.speak(u);
        }
    }["PracticePageContent.useCallback[playWord]"], [
        ttsRate
    ]);
    // Load voices (Chrome needs this to populate getVoices)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PracticePageContent.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") === 'undefined' || !window.speechSynthesis) return;
            const load = {
                "PracticePageContent.useEffect.load": ()=>window.speechSynthesis.getVoices()
            }["PracticePageContent.useEffect.load"];
            load();
            window.speechSynthesis.onvoiceschanged = load;
        }
    }["PracticePageContent.useEffect"], []);
    const currentWord = practiceWords[currentWordIndex];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "app-container",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 flex flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "phona-header",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "phona-logo-link",
                            "aria-label": "Back to Home",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: "/phoneticallylogo.png",
                                alt: "Phonetically",
                                width: 96,
                                height: 96,
                                className: "phona-header-logo",
                                priority: true
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                lineNumber: 582,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                            lineNumber: 581,
                            columnNumber: 11
                        }, this),
                        step === 'word' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "phona-tutorial-progress-wrap phona-header-progress",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "phona-tutorial-progress-bar",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "phona-tutorial-progress-fill",
                                        style: {
                                            width: `${Math.min(100, attemptCount / 3 * 100)}%`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                        lineNumber: 587,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                    lineNumber: 586,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "phona-tutorial-progress-label",
                                    children: [
                                        attemptCount,
                                        "/3"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                    lineNumber: 592,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                            lineNumber: 585,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                            lineNumber: 595,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                    lineNumber: 580,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "app-content-scroll phona-practice-fixed",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "content-wrapper max-w-2xl mx-auto w-full p-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: step === 'word' || step === 'complete' ? 'phona-fresh-container' : 'phona-chat',
                            children: [
                                step !== 'word' && step !== 'complete' && messages.filter((msg, i)=>!(i > 0 && msg.from === messages[i - 1].from && msg.text === messages[i - 1].text)).map((msg, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `phona-message-wrap ${msg.from === 'phona' ? 'phona-message-wrap-bot' : 'phona-message-wrap-user'}`,
                                        children: [
                                            msg.from === 'phona' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "phona-avatar",
                                                "aria-hidden": true,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: "/phoneticallylogo.png",
                                                    alt: "",
                                                    width: 36,
                                                    height: 36
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                    lineNumber: 611,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                lineNumber: 610,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `phona-message phona-message-enter ${msg.from === 'phona' ? 'phona-message-bot' : 'phona-message-user'}`,
                                                children: msg.text
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                lineNumber: 614,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                        lineNumber: 605,
                                        columnNumber: 15
                                    }, this)),
                                step === 'name' && isIntroAnimating && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "phona-message-wrap phona-message-wrap-bot",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "phona-avatar",
                                            "aria-hidden": true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                src: "/phoneticallylogo.png",
                                                alt: "",
                                                width: 36,
                                                height: 36
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                lineNumber: 625,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                            lineNumber: 624,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "phona-typing-indicator",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "phona-typing-dot"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                    lineNumber: 628,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "phona-typing-dot"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                    lineNumber: 629,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "phona-typing-dot"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                    lineNumber: 630,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                            lineNumber: 627,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                    lineNumber: 623,
                                    columnNumber: 15
                                }, this),
                                step === 'name' && isAwaitingName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "phona-input-section",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "phona-input-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    placeholder: "Your name",
                                                    className: "glass-input phona-input",
                                                    value: name,
                                                    onChange: (e)=>setName(e.target.value),
                                                    onKeyDown: (e)=>e.key === 'Enter' && handleNameSubmit()
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                    lineNumber: 638,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: handleNameSubmit,
                                                    className: "glass-button phona-send",
                                                    "aria-label": "Send",
                                                    children: "Send"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                    lineNumber: 646,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                            lineNumber: 637,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "phona-input-hint",
                                            children: "Enter your name to get started"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                            lineNumber: 650,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                    lineNumber: 636,
                                    columnNumber: 15
                                }, this),
                                step === 'mode' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "phona-tutorial-options",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: handleContinueTutorial,
                                            className: "glass-button phona-option-btn phona-option-primary",
                                            children: "Continue with tutorial"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                            lineNumber: 656,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: handleSkipTutorial,
                                            className: "glass-button phona-option-btn phona-option-secondary",
                                            children: "Skip"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                            lineNumber: 663,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                    lineNumber: 655,
                                    columnNumber: 15
                                }, this),
                                step === 'complete' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "phona-complete-view",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "phona-complete-message",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "phona-complete-title",
                                                    children: [
                                                        "Great job, ",
                                                        name || 'there',
                                                        "!"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                    lineNumber: 676,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "phona-complete-subtitle",
                                                    children: "You completed the voice tutorial. Head to your dashboard to pick sounds and keep practicing."
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                    lineNumber: 677,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                            lineNumber: 675,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>router.push('/dashboard'),
                                            className: "glass-button phona-continue-btn",
                                            children: "Continue to Dashboard"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                            lineNumber: 681,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                    lineNumber: 674,
                                    columnNumber: 15
                                }, this),
                                step === 'word' && currentWord && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "phona-fresh-view",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "phona-target-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "phona-target-word-wrap",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "phona-target-word-center",
                                                            children: currentWord
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                            lineNumber: 695,
                                                            columnNumber: 21
                                                        }, this),
                                                        getPhonetics(currentWord) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "phona-target-phonetics",
                                                            children: getPhonetics(currentWord)
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                            lineNumber: 697,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                    lineNumber: 694,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "phona-play-section",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>playWord(currentWord),
                                                            className: "glass-button phona-play-btn",
                                                            title: "Hear the word",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
                                                                    size: 24
                                                                }, void 0, false, {
                                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                                    lineNumber: 707,
                                                                    columnNumber: 23
                                                                }, this),
                                                                "Play"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                            lineNumber: 701,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "phona-rate-toggle",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>setTtsRate('normal'),
                                                                    className: `phona-rate-btn ${ttsRate === 'normal' ? 'phona-rate-active' : ''}`,
                                                                    children: "Normal"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                                    lineNumber: 711,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>setTtsRate('slow'),
                                                                    className: `phona-rate-btn ${ttsRate === 'slow' ? 'phona-rate-active' : ''}`,
                                                                    children: "Slow"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                                    lineNumber: 718,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                            lineNumber: 710,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                    lineNumber: 700,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                            lineNumber: 693,
                                            columnNumber: 17
                                        }, this),
                                        ttsFallback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "phona-tts-fallback",
                                            children: ttsFallback
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                            lineNumber: 728,
                                            columnNumber: 33
                                        }, this),
                                        (()=>{
                                            const statusText = speechStatus === 'browser-unsupported' ? 'Speech recognition is not supported in this browser. Please use Chrome or Edge.' : speechStatus === 'mic-blocked' ? 'Microphone access is blocked. Please enable it in browser settings.' : speechStatus === 'no-speech' ? 'No speech detected' : recState === 'Speech detected' ? 'Speech detected' : speechStatus === 'listening' ? 'Listening...' : recState === 'Error' ? 'Error' : 'Idle';
                                            const statusVariant = recState === 'Speech detected' ? 'success' : speechStatus === 'listening' ? 'listening' : speechStatus === 'no-speech' || speechStatus === 'browser-unsupported' || speechStatus === 'mic-blocked' || recState === 'Error' ? 'error' : 'idle';
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "phona-status-wrap",
                                                role: "status",
                                                "aria-live": "polite",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `phona-status phona-status-${statusVariant}`,
                                                        children: statusText
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                        lineNumber: 754,
                                                        columnNumber: 23
                                                    }, this),
                                                    feedback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "phona-feedback",
                                                        children: feedback
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                        lineNumber: 755,
                                                        columnNumber: 36
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                lineNumber: 753,
                                                columnNumber: 21
                                            }, this);
                                        })(),
                                        speechSupport !== false && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "phona-speak-tip",
                                                    children: "Tip: Tap Speak and start talking right away."
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                    lineNumber: 762,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: isListening ? stopListening : startListening,
                                                    className: `phona-mic-large ${isListening ? 'phona-mic-listening' : ''}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                                            size: 36,
                                                            strokeWidth: 2
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                            lineNumber: 768,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "phona-mic-label",
                                                            children: "Speak"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                            lineNumber: 769,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                    lineNumber: 763,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true),
                                        lastScore && lastScore.accuracy < 90 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: handleRetry,
                                            className: "glass-button phona-retry",
                                            children: "Try again"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                            lineNumber: 775,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                    lineNumber: 692,
                                    columnNumber: 15
                                }, this),
                                step === 'word' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "phona-diagnostics-float",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setIsDiagnosticsOpen((o)=>!o),
                                            className: `phona-diagnostics-toggle ${isDiagnosticsOpen ? 'phona-diagnostics-toggle-open' : ''}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__["Settings2"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                    lineNumber: 790,
                                                    columnNumber: 19
                                                }, this),
                                                "Diagnostics"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                            lineNumber: 785,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `phona-diagnostics-panel ${isDiagnosticsOpen ? 'phona-diagnostics-panel-open' : ''}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "phona-diagnostics-header-row",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "phona-diagnostics-header",
                                                            children: "Speech Diagnostics"
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                            lineNumber: 795,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>setIsDiagnosticsOpen(false),
                                                            className: "phona-diagnostics-close",
                                                            "aria-label": "Close",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                size: 18
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                                lineNumber: 802,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                            lineNumber: 796,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                    lineNumber: 794,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "phona-diagnostics-body",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "phona-diagnostic-row",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: runMicTest,
                                                                    className: "glass-button phona-diagnostic-btn",
                                                                    children: "Mic Test"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                                    lineNumber: 807,
                                                                    columnNumber: 23
                                                                }, this),
                                                                micTestResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "phona-diagnostic-result",
                                                                    children: micTestResult
                                                                }, void 0, false, {
                                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                                    lineNumber: 810,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                            lineNumber: 806,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "phona-diagnostic-row",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: inputLevelActive ? stopInputLevelMeter : startInputLevelMeter,
                                                                    className: "glass-button phona-diagnostic-btn",
                                                                    children: inputLevelActive ? 'Stop Meter' : 'Input Level Meter'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                                    lineNumber: 813,
                                                                    columnNumber: 23
                                                                }, this),
                                                                inputLevelActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "phona-level-bar",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "phona-level-fill",
                                                                                style: {
                                                                                    width: `${Math.min(100, inputLevel * 2)}%`
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                                                lineNumber: 823,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                                            lineNumber: 822,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "phona-level-value",
                                                                            children: inputLevel
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                                            lineNumber: 825,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        inputLevel < 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "phona-diagnostic-warn",
                                                                            children: "Mic not receiving audio—check input device."
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                                            lineNumber: 827,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                            lineNumber: 812,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "phona-debug-panel",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "phona-debug-row",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "phona-debug-label",
                                                                            children: "Status:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                                            lineNumber: 834,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "phona-debug-value",
                                                                            children: recState
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                                            lineNumber: 835,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                                    lineNumber: 833,
                                                                    columnNumber: 23
                                                                }, this),
                                                                lastErrorCode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "phona-debug-row",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "phona-debug-label",
                                                                            children: "Last issue:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                                            lineNumber: 839,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "phona-debug-value phona-debug-error",
                                                                            children: lastErrorCode
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                                            lineNumber: 840,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                                    lineNumber: 838,
                                                                    columnNumber: 25
                                                                }, this),
                                                                targetedMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "phona-targeted-msg",
                                                                    children: targetedMessage
                                                                }, void 0, false, {
                                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                                    lineNumber: 843,
                                                                    columnNumber: 43
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "phona-debug-events",
                                                                    children: debugEvents.slice(-10).map((ev, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "phona-debug-event",
                                                                            children: [
                                                                                "[",
                                                                                ev.t,
                                                                                "] ",
                                                                                ev.event
                                                                            ]
                                                                        }, i, true, {
                                                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                                            lineNumber: 846,
                                                                            columnNumber: 27
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                                    lineNumber: 844,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                            lineNumber: 832,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "phona-device-guidance",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    children: "Mic selection:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                                    lineNumber: 851,
                                                                    columnNumber: 23
                                                                }, this),
                                                                " Edge address bar → lock icon → Site permissions → Microphone. Or Windows Settings → Sound → Input device.",
                                                                audioDevices.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "phona-device-list",
                                                                    children: [
                                                                        "Detected inputs: ",
                                                                        audioDevices.join(', ') || 'none'
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                                    lineNumber: 853,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                            lineNumber: 850,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "phona-interpret-note",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    children: "How to interpret:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                                    lineNumber: 857,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                                    className: "phona-interpret-list",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                            children: "Mic Test fails → microphone permissions or Windows privacy settings"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                                            lineNumber: 859,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                            children: "Meter moves but no speech events → SpeechRecognition service/network may be blocked"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                                            lineNumber: 860,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                            children: "Meter flat → wrong input device or muted mic"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                                            lineNumber: 861,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                                    lineNumber: 858,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                            lineNumber: 856,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                                    lineNumber: 805,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                            lineNumber: 793,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                    lineNumber: 784,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    ref: messagesEndRef
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                    lineNumber: 869,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                            lineNumber: 601,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                        lineNumber: 599,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                    lineNumber: 598,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
            lineNumber: 579,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
        lineNumber: 578,
        columnNumber: 5
    }, this);
}
_s(PracticePageContent, "gtwYrmDKRc0LMlkrou+WmLKXo+E=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = PracticePageContent;
function PracticePage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "app-container",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "phona-header",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "phona-logo-link",
                            "aria-label": "Back to Home",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: "/phoneticallylogo.png",
                                alt: "Phonetically",
                                width: 96,
                                height: 96,
                                className: "phona-header-logo",
                                priority: true
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                                lineNumber: 884,
                                columnNumber: 13
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                            lineNumber: 883,
                            columnNumber: 11
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                            lineNumber: 886,
                            columnNumber: 11
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                    lineNumber: 882,
                    columnNumber: 9
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "app-content-scroll phona-practice-fixed",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "content-wrapper max-w-2xl mx-auto w-full p-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-white/60",
                            children: "Loading..."
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                            lineNumber: 890,
                            columnNumber: 13
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                        lineNumber: 889,
                        columnNumber: 11
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
                    lineNumber: 888,
                    columnNumber: 9
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
            lineNumber: 881,
            columnNumber: 7
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PracticePageContent, {}, void 0, false, {
            fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
            lineNumber: 895,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/OneDrive/Documents/phonetically/app/practice/page.tsx",
        lineNumber: 880,
        columnNumber: 5
    }, this);
}
_c1 = PracticePage;
var _c, _c1;
__turbopack_context__.k.register(_c, "PracticePageContent");
__turbopack_context__.k.register(_c1, "PracticePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=OneDrive_Documents_phonetically_app_practice_page_tsx_c6e07176._.js.map