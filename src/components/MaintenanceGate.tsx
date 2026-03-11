'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Mail, X, Eye } from 'lucide-react';

// ✅ Toggle maintenance mode: set to true/false and push
const MAINTENANCE_ENABLED = true;
const BYPASS_SECRET = 'aenon-preview-2026';
const BYPASS_DURATION = 5 * 60 * 1000; // 5 minutes in ms
const COOKIE_NAME = 'aenon-bypass-expires';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

function setCookie(name: string, value: string, maxAgeSeconds: number) {
  document.cookie = `${name}=${value}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0`;
}

export default function MaintenanceGate({ children }: { children: React.ReactNode }) {
  const [bypassed, setBypassed] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [showBypass, setShowBypass] = useState(false);
  const [countdownDismissed, setCountdownDismissed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Check bypass cookie on mount
  useEffect(() => {
    if (!MAINTENANCE_ENABLED) {
      setBypassed(true);
      setLoaded(true);
      return;
    }

    const expiresAt = getCookie(COOKIE_NAME);
    if (expiresAt) {
      const expiry = parseInt(expiresAt, 10);
      const now = Date.now();
      if (!isNaN(expiry) && expiry > now) {
        setBypassed(true);
      }
    }
    setLoaded(true);
  }, []);

  // Countdown timer when bypassed
  useEffect(() => {
    if (!MAINTENANCE_ENABLED || !bypassed) return;

    const expiresAt = getCookie(COOKIE_NAME);
    if (!expiresAt) return;

    const expiry = parseInt(expiresAt, 10);
    if (isNaN(expiry)) return;

    const update = () => {
      const diff = Math.max(0, Math.floor((expiry - Date.now()) / 1000));
      setRemainingSeconds(diff);
      if (diff <= 0) {
        deleteCookie(COOKIE_NAME);
        setBypassed(false);
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [bypassed]);

  // Logo click handler for hidden bypass
  const handleLogoClick = useCallback(() => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 5) {
      setShowBypass(true);
      setTimeout(() => {
        setShowBypass(false);
        setClickCount(0);
      }, 10000);
    }
  }, [clickCount]);

  // Bypass activation
  const handleBypass = useCallback(() => {
    const secret = prompt('Enter admin access code:');
    if (secret === BYPASS_SECRET) {
      const expiresAt = Date.now() + BYPASS_DURATION;
      setCookie(COOKIE_NAME, String(expiresAt), 300);
      setBypassed(true);
    } else if (secret !== null) {
      alert('Invalid code.');
    }
  }, []);

  // Don't render anything until we've checked the cookie
  if (!loaded) {
    return (
      <div className="fixed inset-0 z-[9999] bg-navy-950" />
    );
  }

  // Maintenance mode off — render site normally
  if (!MAINTENANCE_ENABLED) {
    return <>{children}</>;
  }

  // Bypassed — render site with countdown
  if (bypassed) {
    const minutes = remainingSeconds !== null ? Math.floor(remainingSeconds / 60) : 0;
    const seconds = remainingSeconds !== null ? remainingSeconds % 60 : 0;

    const urgencyColor =
      remainingSeconds !== null && remainingSeconds > 120
        ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
        : remainingSeconds !== null && remainingSeconds > 60
          ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
          : 'bg-accent-500/20 border-accent-500/30 text-accent-400';

    return (
      <>
        {children}
        {remainingSeconds !== null && !countdownDismissed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 right-6 z-[9998]"
          >
            <div className={`flex items-center gap-3 px-4 py-2.5 rounded-full border backdrop-blur-lg shadow-2xl ${urgencyColor}`}>
              <Eye className="w-4 h-4" />
              <span className="text-xs font-medium font-nav uppercase tracking-wider">Preview</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-sm font-bold tabular-nums font-nav">
                  {minutes}:{seconds.toString().padStart(2, '0')}
                </span>
              </div>
              <button
                onClick={() => setCountdownDismissed(true)}
                className="ml-1 opacity-50 hover:opacity-100 transition-opacity"
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </>
    );
  }

  // Not bypassed — show maintenance page
  return (
    <div className="fixed inset-0 z-[9999] bg-navy-950 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(30,48,104,0.4)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(155,14,32,0.12)_0%,transparent_50%)]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center px-8 max-w-xl"
      >
        <button
          onClick={handleLogoClick}
          className="mx-auto mb-10 w-20 h-20 rounded-full overflow-hidden border-2 border-white/10 hover:border-white/20 transition-all duration-300 cursor-default focus:outline-none"
          aria-label="Aenon Church"
        >
          <Image
            src="/logo.png"
            alt="Aenon Church Logo"
            width={80}
            height={80}
            className="w-full h-full object-cover"
            priority
          />
        </button>

        <p className="text-xs uppercase tracking-[0.25em] text-white/30 font-medium mb-6 font-nav">
          Aenon Church
        </p>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[0.95] mb-6">
          We&apos;ll be
          <br />
          right back.
        </h1>

        <div className="w-16 h-0.5 bg-accent-500 mx-auto mb-8" />

        <p className="text-lg text-white/50 leading-relaxed mb-4 max-w-md mx-auto">
          Our website is currently undergoing scheduled maintenance to bring you
          a better experience.
        </p>
        <p className="text-sm text-white/30 leading-relaxed mb-12">
          We expect to be back shortly. Thank you for your patience.
        </p>

        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-sm">
          <Clock className="w-4 h-4 text-accent-400" />
          <span className="text-white/50 text-sm font-nav">
            Sunday Services: 8 AM &middot; 10 AM &middot; 7 PM
          </span>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-white/20 text-xs">
          <Mail className="w-3.5 h-3.5" />
          <span>aenonchurch@gmail.com</span>
        </div>

        <AnimatePresence>
          {showBypass && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={handleBypass}
              className="mt-8 px-6 py-2 rounded-full border border-accent-500/30 text-accent-400 text-xs uppercase tracking-wider hover:bg-accent-500/10 transition-all font-nav"
            >
              Admin Preview
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
