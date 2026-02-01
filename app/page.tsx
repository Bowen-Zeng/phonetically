/**
 * Homepage - Original Phonetically landing page
 * Sign In / Sign Up link to demo auth flow
 */
'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="app-container">
      <div className="flex-1 flex flex-col relative">
        <nav className="landing-nav">
          <div className="nav-inner">
            <Image
              src="/phoneticallylogo.png"
              alt="Phonetically Logo"
              width={96}
              height={96}
              className="nav-logo"
              priority
            />
            <div className="nav-links">
              <Link href="/login" className="nav-btn-secondary">
                Sign In
              </Link>
              <Link href="/login" className="nav-btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </nav>

        <div className="hero-section">
          <div className="hero-orb" aria-hidden />
          <div className="hero-content content-wrapper text-center relative z-10">
            <h1 className="hero-title mb-8">
              Helping You <span className="hero-gradient">Share</span>
              <br />
              <span className="hero-gradient">Your Voice.</span>
            </h1>
            <p className="hero-subtitle hero-subtitle-spacing">
              Phonetically is an accessible pronunciation coach for Deaf and Hard
              of Hearing users and language learners to help them speak with
              confidence.
            </p>
            <Link href="/login" className="hero-primary-btn hero-cta-single">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
