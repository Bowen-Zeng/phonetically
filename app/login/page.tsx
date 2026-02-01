/**
 * Login / Sign Up page - Demo auth (any email + password works)
 * Routes to /practice after success
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/practice');
  };

  return (
    <div className="app-container">
      <div className="login-header">
        <Link href="/" className="phona-logo-link" aria-label="Back to Home">
          <Image
            src="/phoneticallylogo.png"
            alt="Phonetically Logo"
            width={96}
            height={96}
            className="phona-header-logo"
            priority
          />
        </Link>
        <div />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="content-wrapper w-full max-w-md">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">
            Welcome Back
          </h2>
          <p className="text-white/60 text-center mb-8">
            Log in to continue your progress
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-white/70 text-sm block mb-2">Email</label>
              <div className="input-wrapper">
                <Mail size={20} className="input-icon" aria-hidden />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="glass-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-white/70 text-sm block mb-2">
                Password
              </label>
              <div className="input-wrapper">
                <Lock size={20} className="input-icon" aria-hidden />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="glass-input"
                  style={{ paddingRight: 48 }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="input-icon-right"
                  aria-label={
                    showPassword ? 'Hide password' : 'Show password'
                  }
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff size={20} strokeWidth={2} />
                  ) : (
                    <Eye size={20} strokeWidth={2} />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="glass-button w-full p-4 text-lg font-semibold mt-6"
            >
              Log In
            </button>
          </form>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => router.push('/practice')}
              className="glass-button-secondary w-full p-4 text-lg font-semibold"
            >
              Sign Up
            </button>
          </div>

          <p className="text-center text-white/60 mt-6 text-sm">
            Demo: any email and password will log you in
          </p>
        </div>
      </div>
    </div>
  );
}
