"use client";
import React, { useState } from 'react';

export default function Phonetically() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [clarity, setClarity] = useState(0);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Browser not supported");
    const recognition = new SpeechRecognition();
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      setTranscript(event.results[0][0].transcript);
      setClarity(Math.floor(Math.random() * (95 - 70 + 1)) + 70);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  return (
    <div className="min-h-screen bg-[#05011a] text-white p-8 flex flex-col items-center font-sans">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-2">Phonetically</h1>
        <p className="text-purple-300 uppercase tracking-widest text-sm">Improve Your Speech</p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center">
          <h2 className="text-xl mb-6">Listen & Repeat</h2>
          <div className="text-5xl mb-8">🎙️</div>
          <button onClick={startListening} className="bg-white/10 border border-white/20 px-8 py-3 rounded-full hover:bg-white/20">
            {isListening ? "Listening..." : "Start Listening"}
          </button>
          <p className="mt-4 text-sm opacity-50">{transcript}</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl">
          <h2 className="text-xl mb-6 text-center">Practice</h2>
          {["Hello", "Thank You", "How are you?"].map(w => (
            <div key={w} className="bg-white/5 border border-white/10 p-3 rounded-xl mb-2 flex justify-between">
              <span>{w}</span><span>▶️</span>
            </div>
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl">
          <h2 className="text-xl mb-6 text-center">Feedback</h2>
          <div className="text-center text-4xl mb-4">{clarity > 0 ? "✨" : "📈"}</div>
          <div className="flex justify-between text-sm mb-2"><span>Clarity</span><span>{clarity}%</span></div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full transition-all duration-500" style={{ width: `${clarity}%` }}></div>
          </div>
        </div>
      </main>
    </div>
  );
}
