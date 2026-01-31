import React, { useState, useRef, useEffect } from 'react';
import { Mic, Volume2, Book, User, Home, ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Phonetically() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [showAffirmation, setShowAffirmation] = useState(false);
  const [aiGuideMessage, setAiGuideMessage] = useState('');

  // Phonetics categories with specific sounds
  const phoneticCategories = [
    {
      id: 1,
      category: 'Vowel Sounds',
      icon: '🅰️',
      sounds: [
        { sound: 'Short A', example: '/æ/ as in cat', words: ['cat', 'hat', 'bat', 'mat', 'sat', 'rat'] },
        { sound: 'Long A', example: '/eɪ/ as in cake', words: ['cake', 'lake', 'make', 'take', 'bake', 'wake'] },
        { sound: 'Short E', example: '/ɛ/ as in bed', words: ['bed', 'red', 'led', 'fed', 'wed', 'shed'] },
        { sound: 'Long E', example: '/i:/ as in bee', words: ['bee', 'see', 'tree', 'free', 'knee', 'tea'] },
        { sound: 'Short I', example: '/ɪ/ as in sit', words: ['sit', 'hit', 'bit', 'fit', 'kit', 'pit'] },
        { sound: 'Long I', example: '/aɪ/ as in kite', words: ['kite', 'bite', 'site', 'white', 'write', 'light'] },
      ]
    },
    {
      id: 2,
      category: 'Consonant Blends',
      icon: '🔤',
      sounds: [
        { sound: 'BL Blend', example: 'bl- as in blue', words: ['blue', 'black', 'blow', 'bless', 'blood', 'blank'] },
        { sound: 'CR Blend', example: 'cr- as in crab', words: ['crab', 'cream', 'crown', 'cross', 'cry', 'crop'] },
        { sound: 'ST Blend', example: 'st- as in stop', words: ['stop', 'star', 'step', 'stick', 'stand', 'store'] },
        { sound: 'TR Blend', example: 'tr- as in tree', words: ['tree', 'train', 'trap', 'trip', 'truck', 'track'] },
      ]
    },
    {
      id: 3,
      category: 'Fricatives',
      icon: '💨',
      sounds: [
        { sound: 'F Sound', example: '/f/ as in fish', words: ['fish', 'fun', 'fall', 'fast', 'phone', 'laugh'] },
        { sound: 'V Sound', example: '/v/ as in van', words: ['van', 'very', 'vote', 'voice', 'visit', 'valley'] },
        { sound: 'S Sound', example: '/s/ as in sun', words: ['sun', 'see', 'sit', 'soft', 'pass', 'mess'] },
        { sound: 'Z Sound', example: '/z/ as in zoo', words: ['zoo', 'zero', 'zip', 'zoom', 'zebra', 'zone'] },
        { sound: 'TH Sound', example: '/θ/ as in think', words: ['think', 'thank', 'thick', 'thin', 'thumb', 'three'] },
      ]
    },
    {
      id: 4,
      category: 'Plosives',
      icon: '💥',
      sounds: [
        { sound: 'P Sound', example: '/p/ as in pop', words: ['pop', 'pet', 'pan', 'pin', 'cup', 'top'] },
        { sound: 'B Sound', example: '/b/ as in ball', words: ['ball', 'bat', 'big', 'box', 'cub', 'cab'] },
        { sound: 'T Sound', example: '/t/ as in top', words: ['top', 'tea', 'ten', 'two', 'sit', 'cat'] },
        { sound: 'D Sound', example: '/d/ as in dog', words: ['dog', 'day', 'den', 'dot', 'bad', 'red'] },
      ]
    },
    {
      id: 5,
      category: 'R-Controlled Vowels',
      icon: '🔄',
      sounds: [
        { sound: 'AR Sound', example: '/ɑr/ as in car', words: ['car', 'star', 'far', 'jar', 'park', 'dark'] },
        { sound: 'OR Sound', example: '/ɔr/ as in door', words: ['door', 'more', 'store', 'corn', 'fork', 'born'] },
        { sound: 'ER/IR/UR', example: '/ɜr/ as in bird', words: ['bird', 'turn', 'hurt', 'fern', 'girl', 'burn'] },
      ]
    },
  ];

  const affirmations = [
    "Excellent work! 🌟",
    "You're doing amazing! ✨",
    "Great pronunciation! 🎉",
    "Keep it up! You're improving! 💪",
    "Fantastic effort! 🚀",
    "You've got this! 🌈",
    "Beautiful sound production! 🎵",
    "That was perfect! ⭐"
  ];

  // Simulated lessons data (would come from MongoDB)
  const lessons = phoneticCategories;

  // ElevenLabs AI Voice simulation with guide
  const speakWord = async (word) => {
    setIsPlaying(true);
    setAiGuideMessage(`Listen carefully to how I say "${word}"`);
    
    // In production, this would call ElevenLabs API:
    // const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/VOICE_ID', {
    //   method: 'POST',
    //   headers: {
    //     'xi-api-key': 'YOUR_API_KEY',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ text: word })
    // });
    
    // For demo, using Web Speech API
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 0.7;
    utterance.pitch = 1.1;
    utterance.onend = () => {
      setIsPlaying(false);
      setAiGuideMessage("Now it's your turn! Tap the microphone when you're ready.");
    };
    speechSynthesis.speak(utterance);
  };

  const startRecording = () => {
    setIsRecording(true);
    setAiGuideMessage("Listening... Say the word clearly!");
    
    // In production, implement actual recording with Web Audio API
    setTimeout(() => {
      setIsRecording(false);
      const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
      setAiGuideMessage(randomAffirmation);
      setShowAffirmation(true);
      setWordsCompleted(prev => prev + 1);
      
      setTimeout(() => {
        setShowAffirmation(false);
        setCurrentWordIndex(prev => prev + 1);
        setAiGuideMessage("Ready for the next word?");
      }, 2000);
    }, 2500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple email validation - must contain @
    if (!formData.email.includes('@')) {
      alert('Please enter a valid email address with @');
      return;
    }
    // Accept any credentials since there's no database
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Simple email validation - must contain @
    if (!formData.email.includes('@')) {
      alert('Please enter a valid email address with @');
      return;
    }
    // Accept any credentials since there's no database
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const LandingPage = () => (
    <div className="flex-1 flex flex-col">
      {/* Navigation Bar */}
      <nav className="landing-nav">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="/mnt/user-data/uploads/Untitled_design__7_.png" 
              alt="Phonetically Logo" 
              className="nav-logo"
            />
            <span className="text-2xl font-bold text-white">PHONETICALLY</span>
          </div>
          
          <div className="flex items-center gap-8">
            <button className="nav-link">Features</button>
            <button className="nav-link">About</button>
            <button onClick={() => setCurrentPage('welcome')} className="nav-link">Sign in</button>
            <button onClick={() => setCurrentPage('welcome')} className="get-started-btn">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Large glowing orb background */}
        <div className="hero-orb"></div>
        
        <div className="content-wrapper text-center relative z-10">
          <div className="beta-badge mb-6">
            ✨ Early Access Beta
          </div>
          
          <h1 className="hero-title mb-6">
            Build Faster <span className="hero-gradient">With</span><br/>
            <span className="hero-gradient">Lumine Insights</span>
          </h1>
          
          <p className="hero-subtitle mb-12">
            A minimal AI-powered system that transforms complex workflows<br/>
            into clear, glowing, effortless structures — helping you ship ideas<br/>
            faster.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={() => setCurrentPage('welcome')}
              className="hero-primary-btn"
            >
              Get Started
            </button>
            <button className="hero-secondary-btn">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Bottom preview mockup */}
        <div className="preview-mockup">
          <div className="mockup-container">
            <div className="mockup-header">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/mnt/user-data/uploads/Untitled_design__7_.png" 
                  alt="Logo" 
                  className="mockup-logo"
                />
                <span className="text-white font-semibold">PHONETICALLY</span>
              </div>
              <div className="mockup-content">
                <div className="text-white/60 text-sm mb-4">Dashboard Overview</div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="mockup-card">Lessons</div>
                  <div className="mockup-card">Progress</div>
                  <div className="mockup-card">Sessions</div>
                </div>
                <div className="mockup-list">
                  <div className="mockup-item">Vowel Sounds Practice</div>
                  <div className="mockup-item">Consonant Blends</div>
                  <div className="mockup-item">Articulation Training</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const WelcomePage = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <div className="content-wrapper">
        <img 
          src="/mnt/user-data/uploads/Untitled_design__7_.png" 
          alt="Phonetically Logo" 
          className="logo mb-8"
          style={{display: 'block', margin: '0 auto'}}
        />
        
        <h1 className="text-5xl font-bold text-white mb-4 text-center">Phonetically</h1>
        <p className="text-white/70 text-center max-w-lg mb-12 text-lg">
          AI-powered speech therapy for children with hearing challenges and adults managing speech difficulties
        </p>
        
        <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
          <button 
            onClick={() => setCurrentPage('login')}
            className="glass-button p-4 text-lg font-semibold"
          >
            Log In
          </button>
          
          <button 
            onClick={() => setCurrentPage('signup')}
            className="glass-button-secondary p-4 text-lg font-semibold"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );

  const LoginPage = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <div className="content-wrapper w-full max-w-md">
        <button 
          onClick={() => setCurrentPage('landing')}
          className="text-white/60 mb-6 hover:text-white transition-colors flex items-center gap-2"
        >
          ← Back
        </button>
        
        <img 
          src="/mnt/user-data/uploads/Untitled_design__7_.png" 
          alt="Phonetically Logo" 
          className="logo-small mb-6 mx-auto"
          style={{display: 'block'}}
        />
        
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Welcome Back</h2>
        <p className="text-white/60 text-center mb-8">Log in to continue your progress</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-white/70 text-sm block mb-2">Email</label>
            <div className="input-wrapper">
              <Mail size={20} className="input-icon" />
              <input
                type="email"
                placeholder="your@email.com"
                className="glass-input"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div>
            <label className="text-white/70 text-sm block mb-2">Password</label>
            <div className="input-wrapper">
              <Lock size={20} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="glass-input"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="input-icon-right"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          <button type="submit" className="glass-button w-full p-4 text-lg font-semibold mt-6">
            Log In
          </button>
        </form>
        
        <p className="text-center text-white/60 mt-6">
          Don't have an account?{' '}
          <button 
            onClick={() => setCurrentPage('signup')}
            className="text-purple-400 font-semibold hover:text-purple-300 transition-colors"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );

  const SignupPage = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <div className="content-wrapper w-full max-w-md">
        <button 
          onClick={() => setCurrentPage('landing')}
          className="text-white/60 mb-6 hover:text-white transition-colors flex items-center gap-2"
        >
          ← Back
        </button>
        
        <img 
          src="/mnt/user-data/uploads/Untitled_design__7_.png" 
          alt="Phonetically Logo" 
          className="logo-small mb-6 mx-auto"
          style={{display: 'block'}}
        />
        
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Create Account</h2>
        <p className="text-white/60 text-center mb-8">Start your speech therapy journey</p>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-white/70 text-sm block mb-2">Full Name</label>
            <div className="input-wrapper">
              <User size={20} className="input-icon" />
              <input
                type="text"
                placeholder="Your name"
                className="glass-input"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div>
            <label className="text-white/70 text-sm block mb-2">Email</label>
            <div className="input-wrapper">
              <Mail size={20} className="input-icon" />
              <input
                type="email"
                placeholder="your@email.com"
                className="glass-input"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div>
            <label className="text-white/70 text-sm block mb-2">Password</label>
            <div className="input-wrapper">
              <Lock size={20} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="glass-input"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="input-icon-right"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          <button type="submit" className="glass-button w-full p-4 text-lg font-semibold mt-6">
            Sign Up
          </button>
        </form>
        
        <p className="text-center text-white/60 mt-6">
          Already have an account?{' '}
          <button 
            onClick={() => setCurrentPage('login')}
            className="text-purple-400 font-semibold hover:text-purple-300 transition-colors"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto">
      <div className="content-wrapper max-w-4xl mx-auto w-full">
        <div className="text-center mb-12 mt-8">
          <img 
            src="/mnt/user-data/uploads/Untitled_design__7_.png" 
            alt="Phonetically Logo" 
            className="logo-small mb-6 mx-auto"
            style={{display: 'block'}}
          />
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Phonetically</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Empowering children with hearing challenges through AI-powered speech therapy
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="glass-panel p-8">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-white mb-3">Personalized Learning</h3>
            <p className="text-white/70">
              AI-driven lessons tailored to each child's unique speech development needs and progress level
            </p>
          </div>

          <div className="glass-panel p-8">
            <div className="text-4xl mb-4">🎤</div>
            <h3 className="text-2xl font-bold text-white mb-3">Real-Time Feedback</h3>
            <p className="text-white/70">
              Advanced voice recognition provides instant feedback on pronunciation and articulation
            </p>
          </div>

          <div className="glass-panel p-8">
            <div className="text-4xl mb-4">🔊</div>
            <h3 className="text-2xl font-bold text-white mb-3">Natural AI Voice</h3>
            <p className="text-white/70">
              Crystal-clear audio demonstrations using ElevenLabs technology for perfect modeling
            </p>
          </div>

          <div className="glass-panel p-8">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-white mb-3">Track Growth</h3>
            <p className="text-white/70">
              Monitor improvement over time with detailed analytics and milestone celebrations
            </p>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={() => setCurrentPage('lessons')}
            className="glass-button p-6 px-12 text-xl font-semibold inline-flex items-center gap-3"
          >
            Start Learning <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );

  const SpeechDifficultiesPage = () => (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto">
      <div className="content-wrapper max-w-4xl mx-auto w-full">
        <div className="text-center mb-12 mt-8">
          <span className="section-badge">For Adults & Teens</span>
          <h1 className="text-4xl font-bold text-white mb-4 mt-4">Speech Difficulties Support</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Personalized speech therapy for individuals managing aphasia, stuttering, articulation challenges, and voice disorders
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="glass-panel p-8">
            <div className="text-4xl mb-4">🗣️</div>
            <h3 className="text-2xl font-bold text-white mb-3">Aphasia Recovery</h3>
            <p className="text-white/70 mb-4">
              Targeted exercises for language recovery after stroke or brain injury, focusing on word retrieval, sentence formation, and communication confidence
            </p>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>• Word-finding practice</li>
              <li>• Conversational scenarios</li>
              <li>• Progressive difficulty levels</li>
            </ul>
          </div>

          <div className="glass-panel p-8">
            <div className="text-4xl mb-4">⏸️</div>
            <h3 className="text-2xl font-bold text-white mb-3">Fluency Training</h3>
            <p className="text-white/70 mb-4">
              Evidence-based techniques for managing stuttering and cluttering, with real-time feedback and breathing exercises
            </p>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>• Controlled breathing patterns</li>
              <li>• Speech rate monitoring</li>
              <li>• Anxiety management tools</li>
            </ul>
          </div>

          <div className="glass-panel p-8">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-white mb-3">Articulation Therapy</h3>
            <p className="text-white/70 mb-4">
              Clear pronunciation practice for specific sounds and phonemes, with visual feedback and phonetic guidance
            </p>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>• Sound-specific exercises</li>
              <li>• Minimal pair practice</li>
              <li>• Contextual speech training</li>
            </ul>
          </div>

          <div className="glass-panel p-8">
            <div className="text-4xl mb-4">🎵</div>
            <h3 className="text-2xl font-bold text-white mb-3">Voice Disorders</h3>
            <p className="text-white/70 mb-4">
              Vocal rehabilitation for hoarseness, strain, or voice fatigue with pitch and volume control exercises
            </p>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>• Vocal hygiene education</li>
              <li>• Resonance exercises</li>
              <li>• Pitch range expansion</li>
            </ul>
          </div>
        </div>

        <div className="glass-panel p-8 mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-xl font-bold text-purple-400 mb-3">1</div>
              <h4 className="text-lg font-semibold text-white mb-2">Assessment</h4>
              <p className="text-white/60 text-sm">Complete an initial evaluation to identify your specific speech challenges and goals</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-xl font-bold text-purple-400 mb-3">2</div>
              <h4 className="text-lg font-semibold text-white mb-2">Custom Plan</h4>
              <p className="text-white/60 text-sm">Receive a personalized therapy program designed for your unique needs and progress level</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-xl font-bold text-purple-400 mb-3">3</div>
              <h4 className="text-lg font-semibold text-white mb-2">Daily Practice</h4>
              <p className="text-white/60 text-sm">Work through exercises at your own pace with AI guidance and instant feedback</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={() => setCurrentPage('lessons')}
            className="glass-button p-6 px-12 text-xl font-semibold inline-flex items-center gap-3"
          >
            Begin Your Journey <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );

  const LessonsPage = () => (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="content-wrapper max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">Phonetic Practice</h2>
        <p className="text-white/60 mb-8">Choose a sound category to practice</p>
        
        <div className="space-y-6">
          {phoneticCategories.map(category => (
            <div key={category.id} className="glass-panel p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{category.icon}</span>
                <h3 className="text-2xl font-bold text-white">{category.category}</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-3">
                {category.sounds.map((sound, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentLesson({ ...sound, category: category.category });
                      setCurrentWordIndex(0);
                      setWordsCompleted(0);
                      setAiGuideMessage("Let's practice together! Click Listen to hear each word.");
                    }}
                    className="glass-button p-4 text-left hover:scale-[1.02] transition-transform"
                  >
                    <div className="font-semibold text-lg text-white mb-1">{sound.sound}</div>
                    <div className="text-white/60 text-sm">{sound.example}</div>
                    <div className="text-purple-400 text-xs mt-2">{sound.words.length} words</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const LessonInterface = ({ lesson }) => {
    const currentWord = lesson.words[currentWordIndex];
    const progress = ((currentWordIndex) / lesson.words.length) * 100;

    return (
      <div className="flex-1 flex flex-col p-6">
        <div className="content-wrapper max-w-4xl mx-auto w-full">
          <button 
            onClick={() => {
              setCurrentLesson(null);
              setCurrentWordIndex(0);
              setWordsCompleted(0);
              setAiGuideMessage('');
            }}
            className="text-white/60 mb-6 hover:text-white transition-colors flex items-center gap-2"
          >
            ← Back to Lessons
          </button>
          
          {/* Progress Section */}
          <div className="glass-panel p-6 mb-6">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h2 className="text-xl font-bold text-white">{lesson.category} - {lesson.sound}</h2>
                <p className="text-white/60 text-sm">{lesson.example}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-400">{currentWordIndex}/{lesson.words.length}</div>
                <div className="text-white/60 text-sm">words completed</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="relative w-full h-3 bg-black/30 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* AI Guide Message */}
          {aiGuideMessage && (
            <div className="glass-panel p-4 mb-6 border-purple-500/40">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🤖</div>
                <div>
                  <div className="text-purple-400 text-sm font-semibold mb-1">AI Guide</div>
                  <div className="text-white">{aiGuideMessage}</div>
                </div>
              </div>
            </div>
          )}

          {currentWordIndex < lesson.words.length ? (
            <>
              {/* Practice Area */}
              <div className="glass-panel p-12 mb-8 text-center">
                <div className="text-7xl font-bold text-white mb-6 tracking-tight">
                  {currentWord}
                </div>
                
                <button
                  onClick={() => speakWord(currentWord)}
                  disabled={isPlaying}
                  className="glass-button px-10 py-5 inline-flex items-center gap-3 mb-8 disabled:opacity-50 text-lg font-semibold"
                >
                  <Volume2 size={28} />
                  <span>{isPlaying ? 'Playing...' : 'Listen'}</span>
                </button>
                
                <div className="mb-6">
                  <button
                    onClick={startRecording}
                    disabled={isRecording}
                    className={`record-button ${isRecording ? 'recording' : ''}`}
                  >
                    <Mic size={36} />
                  </button>
                </div>
                
                <div className="text-white/70 text-lg">
                  {isRecording ? 'Recording your voice...' : 'Tap microphone to practice'}
                </div>

                {/* Affirmation Animation */}
                {showAffirmation && (
                  <div className="affirmation-popup">
                    {aiGuideMessage}
                  </div>
                )}
              </div>
              
              {/* Word List */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {lesson.words.map((word, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentWordIndex(idx)}
                    className={`glass-button py-3 text-sm transition-all ${
                      idx === currentWordIndex 
                        ? 'ring-2 ring-purple-500 bg-purple-500/20' 
                        : idx < currentWordIndex 
                        ? 'bg-green-500/20 border-green-500/40' 
                        : ''
                    }`}
                  >
                    {idx < currentWordIndex && <span className="mr-1">✓</span>}
                    {word}
                  </button>
                ))}
              </div>
            </>
          ) : (
            /* Completion Screen */
            <div className="glass-panel p-12 text-center">
              <div className="text-6xl mb-6">🎉</div>
              <h3 className="text-4xl font-bold text-white mb-4">Lesson Complete!</h3>
              <p className="text-white/70 text-xl mb-8">
                You practiced {lesson.words.length} words in {lesson.sound}
              </p>
              <button
                onClick={() => {
                  setCurrentLesson(null);
                  setCurrentWordIndex(0);
                  setWordsCompleted(0);
                }}
                className="glass-button px-10 py-4 text-lg font-semibold"
              >
                Choose Another Lesson
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };



  return (
    <div className="app-container">
      <style>{`
        .app-container {
          min-height: 100vh;
          background: linear-gradient(180deg, #0a0a0f 0%, #1a0b2e 50%, #2d1b4e 100%);
          display: flex;
          flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: white;
          position: relative;
        }

        .app-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 30%, rgba(138, 43, 226, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .logo {
          width: 140px;
          height: 140px;
          object-fit: contain;
          filter: drop-shadow(0 10px 40px rgba(138, 43, 226, 0.5));
        }

        .logo-small {
          width: 80px;
          height: 80px;
          object-fit: contain;
          filter: drop-shadow(0 5px 25px rgba(138, 43, 226, 0.4));
        }
        
        .glass-button {
          background: rgba(138, 43, 226, 0.15);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(147, 51, 234, 0.4);
          border-radius: 16px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(138, 43, 226, 0.2);
        }
        
        .glass-button:hover {
          background: rgba(147, 51, 234, 0.25);
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(138, 43, 226, 0.4);
          border-color: rgba(147, 51, 234, 0.6);
        }
        
        .glass-button:active {
          transform: translateY(0);
        }

        .glass-button-secondary {
          background: rgba(20, 20, 30, 0.6);
          backdrop-filter: blur(20px);
          border: 2px solid rgba(147, 51, 234, 0.3);
          border-radius: 16px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .glass-button-secondary:hover {
          background: rgba(30, 30, 45, 0.8);
          transform: translateY(-2px);
          border-color: rgba(147, 51, 234, 0.5);
          box-shadow: 0 8px 30px rgba(138, 43, 226, 0.3);
        }
        
        .glass-button:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
        
        .glass-panel {
          background: rgba(20, 20, 35, 0.5);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(147, 51, 234, 0.2);
          border-radius: 24px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
        }

        .glass-panel:hover {
          background: rgba(30, 30, 45, 0.6);
          transform: translateY(-4px);
          box-shadow: 0 8px 40px rgba(138, 43, 226, 0.3);
          border-color: rgba(147, 51, 234, 0.4);
        }

        .input-wrapper {
          position: relative;
          width: 100%;
        }

        .glass-input {
          width: 100%;
          padding: 14px 16px 14px 48px;
          background: rgba(20, 20, 35, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(147, 51, 234, 0.3);
          border-radius: 12px;
          color: white;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .glass-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .glass-input:focus {
          outline: none;
          background: rgba(30, 30, 45, 0.8);
          border-color: rgba(147, 51, 234, 0.6);
          box-shadow: 0 0 20px rgba(138, 43, 226, 0.3);
        }

        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(147, 51, 234, 0.7);
          pointer-events: none;
        }

        .input-icon-right {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(147, 51, 234, 0.7);
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          transition: color 0.3s ease;
        }

        .input-icon-right:hover {
          color: rgba(147, 51, 234, 1);
        }
        
        .record-button {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #9333ea 0%, #7c3aed 100%);
          border: 3px solid rgba(147, 51, 234, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
          box-shadow: 0 0 30px rgba(147, 51, 234, 0.5);
        }
        
        .record-button:hover {
          transform: scale(1.1);
          box-shadow: 0 0 40px rgba(147, 51, 234, 0.8);
          border-color: rgba(147, 51, 234, 0.8);
        }
        
        .record-button.recording {
          animation: pulse 1.5s ease-in-out infinite;
          background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
        }
        
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 30px rgba(147, 51, 234, 0.5);
          }
          50% { 
            transform: scale(1.1);
            box-shadow: 0 0 50px rgba(147, 51, 234, 0.9);
          }
        }
        
        .nav-bar {
          background: rgba(10, 10, 20, 0.8);
          backdrop-filter: blur(30px);
          border-top: 1px solid rgba(147, 51, 234, 0.2);
          padding: 12px 0;
          position: relative;
          z-index: 10;
        }
        
        .nav-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 8px 16px;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 0.3s ease;
          background: none;
          border: none;
          position: relative;
        }
        
        .nav-button.active {
          color: #a855f7;
        }

        .nav-button.active::before {
          content: '';
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 32px;
          height: 3px;
          background: linear-gradient(90deg, #9333ea, #a855f7);
          border-radius: 2px;
          box-shadow: 0 0 10px rgba(147, 51, 234, 0.6);
        }
        
        .nav-button:hover {
          color: #a855f7;
        }

        .section-badge {
          display: inline-block;
          padding: 6px 16px;
          background: rgba(147, 51, 234, 0.2);
          border: 1px solid rgba(147, 51, 234, 0.4);
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          color: #a855f7;
          margin-bottom: 16px;
        }

        .content-wrapper {
          position: relative;
          z-index: 1;
        }

        /* Landing Page Styles */
        .landing-nav {
          background: rgba(10, 10, 20, 0.6);
          backdrop-filter: blur(30px);
          border-bottom: 1px solid rgba(147, 51, 234, 0.1);
          position: relative;
          z-index: 100;
        }

        .nav-logo {
          width: 32px;
          height: 32px;
          object-fit: contain;
          filter: drop-shadow(0 2px 10px rgba(138, 43, 226, 0.4));
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.7);
          background: none;
          border: none;
          cursor: pointer;
          font-size: 15px;
          transition: color 0.3s ease;
          padding: 8px 12px;
        }

        .nav-link:hover {
          color: white;
        }

        .get-started-btn {
          background: rgba(168, 85, 247, 0.2);
          border: 1px solid rgba(168, 85, 247, 0.4);
          color: white;
          padding: 10px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .get-started-btn:hover {
          background: rgba(168, 85, 247, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(168, 85, 247, 0.3);
        }

        .hero-orb {
          position: absolute;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 800px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(138, 43, 226, 0.1) 40%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
          animation: orbPulse 8s ease-in-out infinite;
        }

        @keyframes orbPulse {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.8; transform: translateX(-50%) scale(1.1); }
        }

        .beta-badge {
          display: inline-block;
          padding: 8px 20px;
          background: rgba(147, 51, 234, 0.15);
          border: 1px solid rgba(147, 51, 234, 0.3);
          border-radius: 24px;
          color: rgba(168, 85, 247, 0.9);
          font-size: 14px;
          font-weight: 600;
        }

        .hero-title {
          font-size: 72px;
          font-weight: 800;
          line-height: 1.1;
          color: white;
          letter-spacing: -0.02em;
        }

        .hero-gradient {
          background: linear-gradient(135deg, #a855f7 0%, #c084fc 50%, #e0c3fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 18px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.6);
          max-width: 700px;
          margin: 0 auto;
        }

        .hero-primary-btn {
          background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
          border: none;
          color: white;
          padding: 16px 40px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(168, 85, 247, 0.3);
        }

        .hero-primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(168, 85, 247, 0.5);
        }

        .hero-secondary-btn {
          background: rgba(20, 20, 35, 0.6);
          border: 1px solid rgba(147, 51, 234, 0.3);
          color: white;
          padding: 16px 40px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(20px);
        }

        .hero-secondary-btn:hover {
          background: rgba(30, 30, 45, 0.8);
          border-color: rgba(147, 51, 234, 0.5);
          transform: translateY(-2px);
        }

        .preview-mockup {
          position: absolute;
          bottom: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 1000px;
          perspective: 1000px;
        }

        .mockup-container {
          background: rgba(15, 15, 25, 0.8);
          backdrop-filter: blur(40px);
          border: 1px solid rgba(147, 51, 234, 0.2);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(147, 51, 234, 0.1);
          transform: rotateX(8deg);
        }

        .mockup-logo {
          width: 28px;
          height: 28px;
          object-fit: contain;
        }

        .mockup-content {
          background: rgba(10, 10, 20, 0.5);
          border: 1px solid rgba(147, 51, 234, 0.1);
          border-radius: 12px;
          padding: 20px;
        }

        .mockup-card {
          background: rgba(147, 51, 234, 0.1);
          border: 1px solid rgba(147, 51, 234, 0.2);
          border-radius: 8px;
          padding: 16px;
          color: white;
          font-size: 13px;
          text-align: center;
        }

        .mockup-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mockup-item {
          background: rgba(20, 20, 35, 0.5);
          border: 1px solid rgba(147, 51, 234, 0.1);
          border-radius: 6px;
          padding: 12px 16px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 13px;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 48px;
          }
          
          .hero-subtitle {
            font-size: 16px;
          }

          .preview-mockup {
            bottom: -50px;
          }
        }

        /* Affirmation Popup */
        .affirmation-popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.8);
          background: linear-gradient(135deg, #9333ea 0%, #a855f7 100%);
          padding: 32px 48px;
          border-radius: 24px;
          font-size: 32px;
          font-weight: 700;
          color: white;
          box-shadow: 0 20px 60px rgba(147, 51, 234, 0.6);
          animation: affirmationAppear 0.5s ease-out forwards;
          z-index: 1000;
        }

        @keyframes affirmationAppear {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
      
      {!isLoggedIn ? (
        <>
          {currentPage === 'landing' && <LandingPage />}
          {currentPage === 'welcome' && <WelcomePage />}
          {currentPage === 'login' && <LoginPage />}
          {currentPage === 'signup' && <SignupPage />}
        </>
      ) : (
        <>
          {currentLesson ? (
            <LessonInterface lesson={currentLesson} />
          ) : (
            <>
              {currentPage === 'home' && <HomePage />}
              {currentPage === 'lessons' && <LessonsPage />}
              {currentPage === 'speech-difficulties' && <SpeechDifficultiesPage />}
            </>
          )}
          
          <nav className="nav-bar">
            <div className="flex justify-around items-center max-w-md mx-auto w-full">
              <button
                onClick={() => setCurrentPage('home')}
                className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
              >
                <Home size={24} />
                <span className="text-xs">Home</span>
              </button>
              
              <button
                onClick={() => setCurrentPage('lessons')}
                className={`nav-button ${currentPage === 'lessons' ? 'active' : ''}`}
              >
                <Book size={24} />
                <span className="text-xs">Lessons</span>
              </button>
              
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setCurrentPage('welcome');
                }}
                className="nav-button"
              >
                <User size={24} />
                <span className="text-xs">Logout</span>
              </button>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
