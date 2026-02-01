/**
 * Dashboard - personalized practice hub
 * Sections: Greeting, Recommended, Progress Overview, Recently Practiced, Phonetic Files
 */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PHONETIC_FILES = [
  { id: 'TH', title: 'TH', examples: 'think, thumb, the, that, this', sound: 'TH' },
  { id: 'R', title: 'R', examples: 'red, run, car, rock, rain', sound: 'R' },
  { id: 'S', title: 'S', examples: 'sun, sit, bus, sat, see', sound: 'S' },
  { id: 'SH', title: 'SH', examples: 'ship, shoe, fish, wash, shop', sound: 'SH' },
  { id: 'L', title: 'L', examples: 'lip, look, ball, light, love', sound: 'L' },
  { id: 'Short-A', title: 'Short A', examples: 'cat, hat, bat, mat, sat', sound: 'Short A' },
  { id: 'Short-I', title: 'Short I', examples: 'sit, hit, pig, big, win', sound: 'Short I' },
  { id: 'Short-E', title: 'Short E', examples: 'red, bed, led, pet, net', sound: 'Short E' },
  { id: 'F', title: 'F', examples: 'fun, fish, off, four, fine', sound: 'F' },
  { id: 'V', title: 'V', examples: 'van, vine, love, have, very', sound: 'V' },
];

const DAILY_GOAL = 12;

type ProgressData = {
  attemptCount: number;
  dailyAttemptCount?: number;
  avgAccuracy: number;
  soundsPracticedCount: number;
  bySound: { sound: string; avgAccuracy: number; attemptCount: number }[];
  bestSound: string | null;
  worstSound: string | null;
};

type RecentAttempt = { word: string; sound?: string; accuracy: number; createdAt: string };

type RecommendedData = { sound: string; reason: string; avgAccuracy: number | null };

export default function DashboardPage() {
  const [userName, setUserName] = useState<string>('');
  const [userId, setUserId] = useState('default');
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [recent, setRecent] = useState<RecentAttempt[]>([]);
  const [recommended, setRecommended] = useState<RecommendedData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let uid = 'default';
    let name = '';
    try {
      uid = localStorage.getItem('phona-user-id') || 'default';
      name = localStorage.getItem('phona-user-name') || '';
    } catch { /* ignore */ }
    setUserId(uid);
    setUserName(name);

    Promise.all([
      fetch(`/api/dashboard/progress?userId=${encodeURIComponent(uid)}`).then((r) => r.json()),
      fetch(`/api/dashboard/recent?userId=${encodeURIComponent(uid)}`).then((r) => r.json()),
      fetch(`/api/dashboard/recommended?userId=${encodeURIComponent(uid)}`).then((r) => r.json()),
    ])
      .then(([prog, rec, recm]) => {
        setProgress(prog);
        setRecent(rec);
        setRecommended(recm);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const hasProgress = progress && progress.attemptCount > 0;
  const greeting = userName.trim()
    ? `Hello, ${userName.trim()}! Let's work on some phonetics.`
    : "Hello! Let's work on some phonetics.";

  return (
    <div className="app-container">
      <div className="phona-header">
        <Link href="/" className="phona-logo-link" aria-label="Back to Home">
          <Image src="/phoneticallylogo.png" alt="Phonetically" width={96} height={96} className="phona-header-logo" priority />
        </Link>
        <div />
      </div>
      <div className="app-content-scroll">
        <div className="content-wrapper max-w-2xl mx-auto w-full p-8">
        {/* 1) Greeting + subtitle */}
        <h1 className="dashboard-title">{greeting}</h1>
        <p className="dashboard-subtitle">
          Pick a sound to practice and build your pronunciation skills.
        </p>
        <p className="dashboard-tip">
          Tip: Start with the sound you find hardest.
        </p>

        {/* Daily progress: X/12 - links to practice */}
        <Link href="/practice" className="dashboard-daily-progress glass-panel">
          <span className="dashboard-daily-label">Daily progress</span>
          <span className="dashboard-daily-value">
            {loading ? '—' : (progress?.dailyAttemptCount ?? 0)}/{DAILY_GOAL}
          </span>
        </Link>

        {loading ? (
          <p className="text-white/60">Loading...</p>
        ) : (
          <>
            {/* 2) Recommended for You */}
            <div className="dashboard-recommended glass-panel">
              <h2 className="dashboard-section-title">Recommended for you</h2>
              {recommended ? (
                <>
                  <p className="dashboard-recommended-text">
                    {recommended.reason}
                    {recommended.avgAccuracy != null && (
                      <> (avg {recommended.avgAccuracy}%)</>
                    )}
                  </p>
                  <Link
                    href={`/practice?sound=${encodeURIComponent(recommended.sound)}`}
                    className="dashboard-practice-btn dashboard-practice-btn-primary"
                    aria-label={`Practice ${recommended.sound}`}
                  >
                    Practice {recommended.sound}
                  </Link>
                </>
              ) : (
                <>
                  <p className="dashboard-recommended-text">Get started with Short A — a common sound to practice.</p>
                  <Link
                    href="/practice?sound=Short%20A"
                    className="dashboard-practice-btn dashboard-practice-btn-primary"
                    aria-label="Practice Short A"
                  >
                    Practice Short A
                  </Link>
                </>
              )}
            </div>

            {/* 3) Progress Overview */}
            <h2 className="dashboard-section-title">Progress Overview</h2>
            {hasProgress && progress ? (
              <>
                <div className="dashboard-stats">
                  <div className="dashboard-stat-card glass-panel">
                    <div className="dashboard-stat-value">{progress.avgAccuracy}%</div>
                    <div className="dashboard-stat-label">Avg Accuracy</div>
                  </div>
                  <div className="dashboard-stat-card glass-panel">
                    <div className="dashboard-stat-value">{progress.attemptCount}</div>
                    <div className="dashboard-stat-label">Attempts</div>
                  </div>
                  <div className="dashboard-stat-card glass-panel">
                    <div className="dashboard-stat-value">{progress.bestSound || '—'}</div>
                    <div className="dashboard-stat-label">Best Sound</div>
                  </div>
                  <div className="dashboard-stat-card glass-panel">
                    <div className="dashboard-stat-value">{progress.worstSound || '—'}</div>
                    <div className="dashboard-stat-label">Needs Work</div>
                  </div>
                </div>
                {progress.bySound.length > 0 && (
                  <div className="dashboard-by-sound">
                    <h3 className="dashboard-by-sound-title">By sound</h3>
                    {progress.bySound.map((b) => (
                      <div key={b.sound} className="dashboard-sound-row">
                        <div className="dashboard-sound-info">
                          <span className="dashboard-sound-name">{b.sound}</span>
                          <span className="dashboard-sound-meta">{b.attemptCount} attempts, {b.avgAccuracy}%</span>
                        </div>
                        <div className="dashboard-progress-bar">
                          <div
                            className="dashboard-progress-fill"
                            style={{ width: `${Math.min(100, b.avgAccuracy)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <p className="dashboard-empty">No progress yet — complete a practice session to see stats.</p>
            )}

            {/* 4) Recently Practiced */}
            <h2 className="dashboard-section-title">Recently Practiced</h2>
            {recent.length > 0 ? (
              <div className="dashboard-recent glass-panel">
                <div className="dashboard-recent-list">
                  {recent.map((a, i) => (
                    <div key={i} className="dashboard-recent-item">
                      <span className="text-white/80">{a.word}</span>
                      <span className={a.accuracy >= 90 ? 'color-green' : 'color-amber'}>{a.accuracy}%</span>
                      {a.createdAt && (
                        <span className="dashboard-recent-date">
                          {new Date(a.createdAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="dashboard-empty">No recent attempts yet.</p>
            )}

            {/* 5) Phonetic Files */}
            <h2 className="dashboard-section-title">Phonetic files</h2>
            <p className="dashboard-section-desc">
              Choose a sound to practice from the list below.
            </p>
            <div className="dashboard-cards">
              {PHONETIC_FILES.map((f) => (
                <div key={f.id} className="dashboard-card glass-panel">
                  <div className="dashboard-card-content">
                    <div className="dashboard-card-text">
                      <div className="dashboard-card-title">{f.title}</div>
                      <div className="dashboard-card-examples">{f.examples}</div>
                    </div>
                    <Link
                      href={`/practice?sound=${encodeURIComponent(f.sound)}`}
                      className="dashboard-practice-btn"
                      aria-label={`Practice ${f.sound}`}
                    >
                      Practice {f.sound}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        </div>
      </div>
    </div>
  );
}
