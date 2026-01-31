"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Mic, Volume2, Book, User, Home, ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface Sound {
  sound: string;
  example: string;
  words: string[];
}

interface Category {
  id: number;
  category: string;
  icon: string;
  sounds: Sound[];
}

type Lesson = Sound & { category: string };

export default function Phonetically() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
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

  const speakWord = async (word: string) => {
    setIsPlaying(true);
    setAiGuideMessage(`Listen carefully to how I say "${word}"`);
    
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.includes('@')) {
      alert('Please enter a valid email address with @');
      return;
    }
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.includes('@')) {
      alert('Please enter a valid email address with @');
      return;
    }
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const LandingPage = () => (
    <div className="flex-1 flex flex-col overflow-hidden">
      <nav className="landing-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <img 
              src="/mnt/user-data/uploads/Untitled_design__7_.png" 
              alt="Phonetically Logo" 
              className="nav-logo"
            />
            <span className="text-xl sm:text-2xl font-bold text-white">PHONETICALLY</span>
          </div>
          
          <div className="hidden sm:flex items-center gap-4 lg:gap-8">
            <button className="nav-link">Features</button>
            <button className="nav-link">About</button>
            <button onClick={() => setCurrentPage('welcome')} className="nav-link">Sign in</button>
            <button onClick={() => setCurrentPage('welcome')} className="get-started-btn">
              Get Started
            </button>
          </div>
          
          <button onClick={() => setCurrentPage('welcome')} className="sm:hidden get-started-btn">
            Start
          </button>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 relative overflow-hidden">
        <div className="hero-orb"></div>
        
        <div className="content-wrapper text-center relative z-10 max-w-5xl mx-auto">
          <div className="beta-badge mb-4 sm:mb-6">
            ✨ Early Access Beta
          </div>
          
          <h1 className="hero-title mb-4 sm:mb-6">
            Build Faster <span className="hero-gradient">With</span><br/>
            <span className="hero-gradient">Lumine Insights</span>
          </h1>
          
          <p className="hero-subtitle mb-8 sm:mb-12 px-4">
            A minimal AI-powered system that transforms complex workflows<br className="hidden sm:block"/>
            into clear, glowing, effortless structures — helping you ship ideas<br className="hidden sm:block"/>
            faster.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
            <button 
              onClick={() => setCurrentPage('welcome')}
              className="hero-primary-btn w-full sm:w-auto"
            >
              Get Started
            </button>
            <button className="hero-secondary-btn w-full sm:w-auto">
              Watch Demo
            </button>
          </div>
        </div>

        <div className="preview-mockup hidden lg:block">
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
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="content-wrapper w-full max-w-md">
        <img 
          src="/mnt/user-data/uploads/Untitled_design__7_.png" 
          alt="Phonetically Logo" 
          className="logo mb-6 sm:mb-8"
          style={{display: 'block', margin: '0 auto'}}
        />
        
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3 sm:mb-4 text-center">Phonetically</h1>
        <p className="text-white/70 text-center max-w-lg mb-8 sm:mb-12 text-base sm:text-lg px-4">
          AI-powered speech therapy for children with hearing challenges and adults managing speech difficulties
        </p>
        
        <div className="flex flex-col gap-4 w-full px-4">
          <button 
            onClick={() => setCurrentPage('login')}
            className="glass-button p-3 sm:p-4 text-base sm:text-lg font-semibold"
          >
            Log In
          </button>
          
          <button 
            onClick={() => setCurrentPage('signup')}
            className="glass-button-secondary p-3 sm:p-4 text-base sm:text-lg font-semibold"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );

  const LoginPage = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="content-wrapper w-full max-w-md">
        <button 
          onClick={() => setCurrentPage('landing')}
          className="text-white/60 mb-4 sm:mb-6 hover:text-white transition-colors flex items-center gap-2"
        >
          ← Back
        </button>
        
        <img 
          src="/mnt/user-data/uploads/Untitled_design__7_.png" 
          alt="Phonetically Logo" 
          className="logo-small mb-4 sm:mb-6 mx-auto"
          style={{display: 'block'}}
        />
        
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center">Welcome Back</h2>
        <p className="text-white/60 text-center mb-6 sm:mb-8 text-sm sm:text-base">Log in to continue your progress</p>
        
        <form onSubmit={handleLogin} className="space-y-4 px-4 sm:px-0">
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
          
          <button type="submit" className="glass-button w-full p-3 sm:p-4 text-base sm:text-lg font-semibold mt-6">
            Log In
          </button>
        </form>
        
        <p className="text-center text-white/60 mt-4 sm:mt-6 text-sm sm:text-base">
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
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="content-wrapper w-full max-w-md">
        <button 
          onClick={() => setCurrentPage('landing')}
          className="text-white/60 mb-4 sm:mb-6 hover:text-white transition-colors flex items-center gap-2"
        >
          ← Back
        </button>
        
        <img 
          src="/mnt/user-data/uploads/Untitled_design__7_.png" 
          alt="Phonetically Logo" 
          className="logo-small mb-4 sm:mb-6 mx-auto"
          style={{display: 'block'}}
        />
        
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center">Create Account</h2>
        <p className="text-white/60 text-center mb-6 sm:mb-8 text-sm sm:text-base">Start your speech therapy journey</p>
        
        <form onSubmit={handleSignup} className="space-y-4 px-4 sm:px-0">
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
          
          <button type="submit" className="glass-button w-full p-3 sm:p-4 text-base sm:text-lg font-semibold mt-6">
            Sign Up
          </button>
        </form>
        
        <p className="text-center text-white/60 mt-4 sm:mt-6 text-sm sm:text-base">
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
    <div className="flex-1 flex flex-col p-4 sm:p-6 overflow-y-auto pb-20">
      <div className="content-wrapper max-w-4xl mx-auto w-full">
        <div className="text-center mb-8 sm:mb-12 mt-4 sm:mt-8">
          <img 
            src="/mnt/user-data/uploads/Untitled_design__7_.png" 
            alt="Phonetically Logo" 
            className="logo-small mb-4 sm:mb-6 mx-auto"
            style={{display: 'block'}}
          />
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 px-4">Welcome to Phonetically</h1>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Empowering children with hearing challenges through AI-powered speech therapy
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12 px-4">
          <div className="glass-panel p-6 sm:p-8">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎯</div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Personalized Learning</h3>
            <p className="text-white/70 text-sm sm:text-base">
              AI-driven lessons tailored to each child's unique speech development needs and progress level
            </p>
          </div>

          <div className="glass-panel p-6 sm:p-8">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎤</div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Real-Time Feedback</h3>
            <p className="text-white/70 text-sm sm:text-base">
              Advanced voice recognition provides instant feedback on pronunciation and articulation
            </p>
          </div>

          <div className="glass-panel p-6 sm:p-8">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🔊</div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Natural AI Voice</h3>
            <p className="text-white/70 text-sm sm:text-base">
              Crystal-clear audio demonstrations using ElevenLabs technology for perfect modeling
            </p>
          </div>

          <div className="glass-panel p-6 sm:p-8">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📊</div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Track Growth</h3>
            <p className="text-white/70 text-sm sm:text-base">
              Monitor improvement over time with detailed analytics and milestone celebrations
            </p>
          </div>
        </div>

        <div className="text-center pb-4">
          <button 
            onClick={() => setCurrentPage('lessons')}
            className="glass-button p-4 sm:p-6 px-8 sm:px-12 text-lg sm:text-xl font-semibold inline-flex items-center gap-2 sm:gap-3"
          >
            Start Learning <ArrowRight size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </div>
  );

  const LessonsPage = () => (
    <div className="flex-1 p-4 sm:p-6 overflow-y-auto pb-20">
      <div className="content-wrapper max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Phonetic Practice</h2>
        <p className="text-white/60 mb-6 sm:mb-8 text-sm sm:text-base">Choose a sound category to practice</p>
        
        <div className="space-y-4 sm:space-y-6">
          {phoneticCategories.map(category => (
            <div key={category.id} className="glass-panel p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="text-3xl sm:text-4xl">{category.icon}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">{category.category}</h3>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-3">
                {category.sounds.map((sound, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentLesson({ ...sound, category: category.category });
                      setCurrentWordIndex(0);
                      setWordsCompleted(0);
                      setAiGuideMessage("Let's practice together! Click Listen to hear each word.");
                    }}
                    className="glass-button p-3 sm:p-4 text-left hover:scale-[1.02] transition-transform"
                  >
                    <div className="font-semibold text-base sm:text-lg text-white mb-1">{sound.sound}</div>
                    <div className="text-white/60 text-xs sm:text-sm">{sound.example}</div>
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

  const LessonInterface = ({ lesson }: { lesson: Lesson }) => {
    const currentWord = lesson.words[currentWordIndex];
    const progress = ((currentWordIndex) / lesson.words.length) * 100;

    return (
      <div className="flex-1 flex flex-col p-4 sm:p-6 overflow-y-auto pb-20">
        <div className="content-wrapper max-w-4xl mx-auto w-full">
          <button 
            onClick={() => {
              setCurrentLesson(null);
              setCurrentWordIndex(0);
              setWordsCompleted(0);
              setAiGuideMessage('');
            }}
            className="text-white/60 mb-4 sm:mb-6 hover:text-white transition-colors flex items-center gap-2 text-sm sm:text-base"
          >
            ← Back to Lessons
          </button>
          
          <div className="glass-panel p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">{lesson.category} - {lesson.sound}</h2>
                <p className="text-white/60 text-xs sm:text-sm">{lesson.example}</p>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-xl sm:text-2xl font-bold text-purple-400">{currentWordIndex}/{lesson.words.length}</div>
                <div className="text-white/60 text-xs sm:text-sm">words completed</div>
              </div>
            </div>
            
            <div className="relative w-full h-2 sm:h-3 bg-black/30 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
            </div>
          </div>

          {aiGuideMessage && (
            <div className="glass-panel p-3 sm:p-4 mb-4 sm:mb-6 border-purple-500/40">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="text-xl sm:text-2xl">🤖</div>
                <div>
                  <div className="text-purple-400 text-xs sm:text-sm font-semibold mb-1">AI Guide</div>
                  <div className="text-white text-sm sm:text-base">{aiGuideMessage}</div>
                </div>
              </div>
            </div>
          )}

          {currentWordIndex < lesson.words.length ? (
            <>
              <div className="glass-panel p-8 sm:p-12 mb-6 sm:mb-8 text-center">
                <div className="text-5xl sm:text-7xl font-bold text-white mb-4 sm:mb-6 tracking-tight">
                  {currentWord}
                </div>
                
                <button
                  onClick={() => speakWord(currentWord)}
                  disabled={isPlaying}
                  className="glass-button px-8 sm:px-10 py-4 sm:py-5 inline-flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 disabled:opacity-50 text-base sm:text-lg font-semibold"
                >
                  <Volume2 size={24} className="sm:w-7 sm:h-7" />
                  <span>{isPlaying ? 'Playing...' : 'Listen'}</span>
                </button>
                
                <div className="mb-4 sm:mb-6">
                  <button
                    onClick={startRecording}
                    disabled={isRecording}
                    className={`record-button ${isRecording ? 'recording' : ''}`}
                  >
                    <Mic size={32} className="sm:w-9 sm:h-9" />
                  </button>
                </div>
                
                <div className="text-white/70 text-base sm:text-lg">
                  {isRecording ? 'Recording your voice...' : 'Tap microphone to practice'}
                </div>

                {showAffirmation && (
                  <div className="affirmation-popup">
                    {aiGuideMessage}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
                {lesson.words.map((word: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentWordIndex(idx)}
                    className={`glass-button py-2 sm:py-3 text-xs sm:text-sm transition-all ${
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
            <div className="glass-panel p-8 sm:p-12 text-center">
              <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">🎉</div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">Lesson Complete!</h3>
              <p className="text-white/70 text-lg sm:text-xl mb-6 sm:mb-8">
                You practiced {lesson.words.length} words in {lesson.sound}
              </p>
              <button
                onClick={() => {
                  setCurrentLesson(null);
                  setCurrentWordIndex(0);
                  setWordsCompleted(0);
                }}
                className="glass-button px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold"
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
        * {
          box-sizing: border-box;
        }

        .app-container {
          min-height: 100vh;
          height: 100vh;
          background: linear-gradient(180deg, #0a0a0f 0%, #1a0b2e 50%, #2d1b4e 100%);
          display: flex;
          flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .app-container::before {
          content: '';
          position: fixed;
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
          width: 100px;
          height: 100px;
          object-fit: contain;
          filter: drop-shadow(0 10px 40px rgba(138, 43, 226, 0.5));
        }

        @media (min-width: 640px) {
          .logo {
            width: 140px;
            height: 140px;
          }
        }

        .logo-small {
          width: 60px;
          height: 60px;
          object-fit: contain;
          filter: drop-shadow(0 5px 25px rgba(138, 43, 226, 0.4));
        }

        @media (min-width: 640px) {
          .logo-small {
            width: 80px;
            height: 80px;
          }
        }
        
        .glass-button {
          background: rgba(138, 43, 226, 0.15);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(147, 51, 234, 0.4);
          border-radius: 12px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(138, 43, 226, 0.2);
        }

        @media (min-width: 640px) {
          .glass-button {
            border-radius: 16px;
          }
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
          border-radius: 12px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        @media (min-width: 640px) {
          .glass-button-secondary {
            border-radius: 16px;
          }
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
          border-radius: 16px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
        }

        @media (min-width: 640px) {
          .glass-panel {
            border-radius: 24px;
          }
        }

        .glass-panel:hover {
          background: rgba(30, 30, 45, 0.6);
          transform: translateY(-2px);
          box-shadow: 0 8px 40px rgba(138, 43, 226, 0.3);
          border-color: rgba(147, 51, 234, 0.4);
        }

        .input-wrapper {
          position: relative;
          width: 100%;
        }

        .glass-input {
          width: 100%;
          padding: 12px 14px 12px 44px;
          background: rgba(20, 20, 35, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(147, 51, 234, 0.3);
          border-radius: 12px;
          color: white;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        @media (min-width: 640px) {
          .glass-input {
            padding: 14px 16px 14px 48px;
            font-size: 16px;
          }
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
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(147, 51, 234, 0.7);
          pointer-events: none;
        }

        @media (min-width: 640px) {
          .input-icon {
            left: 16px;
          }
        }

        .input-icon-right {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(147, 51, 234, 0.7);
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          transition: color 0.3s ease;
        }

        @media (min-width: 640px) {
          .input-icon-right {
            right: 16px;
          }
        }

        .input-icon-right:hover {
          color: rgba(147, 51, 234, 1);
        }
        
        .record-button {
          width: 70px;
          height: 70px;
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
          margin: 0 auto;
        }

        @media (min-width: 640px) {
          .record-button {
            width: 80px;
            height: 80px;
          }
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
          background: rgba(10, 10, 20, 0.95);
          backdrop-filter: blur(30px);
          border-top: 1px solid rgba(147, 51, 234, 0.2);
          padding: 8px 0;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 100;
        }

        @media (min-width: 640px) {
          .nav-bar {
            padding: 12px 0;
          }
        }
        
        .nav-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          padding: 6px 12px;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 0.3s ease;
          background: none;
          border: none;
          position: relative;
        }

        @media (min-width: 640px) {
          .nav-button {
            gap: 4px;
            padding: 8px 16px;
          }
        }
        
        .nav-button.active {
          color: #a855f7;
        }

        .nav-button.active::before {
          content: '';
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 28px;
          height: 3px;
          background: linear-gradient(90deg, #9333ea, #a855f7);
          border-radius: 2px;
          box-shadow: 0 0 10px rgba(147, 51, 234, 0.6);
        }

        @media (min-width: 640px) {
          .nav-button.active::before {
            top: -12px;
            width: 32px;
          }
        }
        
        .nav-button:hover {
          color: #a855f7;
        }

        .section-badge {
          display: inline-block;
          padding: 4px 12px;
          background: rgba(147, 51, 234, 0.2);
          border: 1px solid rgba(147, 51, 234, 0.4);
          border-radius: 16px;
          font-size: 12px;
          font-weight: 600;
          color: #a855f7;
          margin-bottom: 12px;
        }

        @media (min-width: 640px) {
          .section-badge {
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 14px;
            margin-bottom: 16px;
          }
        }

        .content-wrapper {
          position: relative;
          z-index: 1;
        }

        .landing-nav {
          background: rgba(10, 10, 20, 0.8);
          backdrop-filter: blur(30px);
          border-bottom: 1px solid rgba(147, 51, 234, 0.1);
          position: relative;
          z-index: 100;
        }

        .nav-logo {
          width: 28px;
          height: 28px;
          object-fit: contain;
          filter: drop-shadow(0 2px 10px rgba(138, 43, 226, 0.4));
        }

        @media (min-width: 640px) {
          .nav-logo {
            width: 32px;
            height: 32px;
          }
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.7);
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          transition: color 0.3s ease;
          padding: 6px 10px;
        }

        @media (min-width: 640px) {
          .nav-link {
            font-size: 15px;
            padding: 8px 12px;
          }
        }

        .nav-link:hover {
          color: white;
        }

        .get-started-btn {
          background: rgba(168, 85, 247, 0.2);
          border: 1px solid rgba(168, 85, 247, 0.4);
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 13px;
          transition: all 0.3s ease;
        }

        @media (min-width: 640px) {
          .get-started-btn {
            padding: 10px 24px;
            font-size: 14px;
          }
        }

        .get-started-btn:hover {
          background: rgba(168, 85, 247, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(168, 85, 247, 0.3);
        }

        .hero-orb {
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(138, 43, 226, 0.1) 40%, transparent 70%);
          filter: blur(40px);
          pointer-events: none;
          animation: orbPulse 8s ease-in-out infinite;
        }

        @media (min-width: 1024px) {
          .hero-orb {
            top: -200px;
            width: 800px;
            height: 800px;
            filter: blur(60px);
          }
        }

        @keyframes orbPulse {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.8; transform: translateX(-50%) scale(1.1); }
        }

        .beta-badge {
          display: inline-block;
          padding: 6px 16px;
          background: rgba(147, 51, 234, 0.15);
          border: 1px solid rgba(147, 51, 234, 0.3);
          border-radius: 20px;
          color: rgba(168, 85, 247, 0.9);
          font-size: 12px;
          font-weight: 600;
        }

        @media (min-width: 640px) {
          .beta-badge {
            padding: 8px 20px;
            border-radius: 24px;
            font-size: 14px;
          }
        }

        .hero-title {
          font-size: 36px;
          font-weight: 800;
          line-height: 1.1;
          color: white;
          letter-spacing: -0.02em;
        }

        @media (min-width: 640px) {
          .hero-title {
            font-size: 56px;
          }
        }

        @media (min-width: 1024px) {
          .hero-title {
            font-size: 72px;
          }
        }

        .hero-gradient {
          background: linear-gradient(135deg, #a855f7 0%, #c084fc 50%, #e0c3fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.6);
          max-width: 100%;
          margin: 0 auto;
        }

        @media (min-width: 640px) {
          .hero-subtitle {
            font-size: 16px;
            line-height: 1.7;
          }
        }

        @media (min-width: 1024px) {
          .hero-subtitle {
            font-size: 18px;
            line-height: 1.8;
            max-width: 700px;
          }
        }

        .hero-primary-btn {
          background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
          border: none;
          color: white;
          padding: 14px 32px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(168, 85, 247, 0.3);
        }

        @media (min-width: 640px) {
          .hero-primary-btn {
            padding: 16px 40px;
            font-size: 16px;
          }
        }

        .hero-primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(168, 85, 247, 0.5);
        }

        .hero-secondary-btn {
          background: rgba(20, 20, 35, 0.6);
          border: 1px solid rgba(147, 51, 234, 0.3);
          color: white;
          padding: 14px 32px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(20px);
        }

        @media (min-width: 640px) {
          .hero-secondary-btn {
            padding: 16px 40px;
            font-size: 16px;
          }
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

        .affirmation-popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.8);
          background: linear-gradient(135deg, #9333ea 0%, #a855f7 100%);
          padding: 24px 36px;
          border-radius: 20px;
          font-size: 24px;
          font-weight: 700;
          color: white;
          box-shadow: 0 20px 60px rgba(147, 51, 234, 0.6);
          animation: affirmationAppear 0.5s ease-out forwards;
          z-index: 1000;
          max-width: 90%;
          text-align: center;
        }

        @media (min-width: 640px) {
          .affirmation-popup {
            padding: 32px 48px;
            border-radius: 24px;
            font-size: 32px;
            max-width: auto;
          }
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
            </>
          )}
          
          <nav className="nav-bar">
            <div className="flex justify-around items-center max-w-md mx-auto w-full">
              <button
                onClick={() => setCurrentPage('home')}
                className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
              >
                <Home size={20} className="sm:w-6 sm:h-6" />
                <span className="text-xs">Home</span>
              </button>
              
              <button
                onClick={() => setCurrentPage('lessons')}
                className={`nav-button ${currentPage === 'lessons' ? 'active' : ''}`}
              >
                <Book size={20} className="sm:w-6 sm:h-6" />
                <span className="text-xs">Lessons</span>
              </button>
              
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setCurrentPage('welcome');
                }}
                className="nav-button"
              >
                <User size={20} className="sm:w-6 sm:h-6" />
                <span className="text-xs">Logout</span>
              </button>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
