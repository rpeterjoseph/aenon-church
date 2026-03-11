'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Mail } from 'lucide-react';

export default function MaintenancePage() {
  const [clickCount, setClickCount] = useState(0);
  const [showBypass, setShowBypass] = useState(false);

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

  const handleBypass = () => {
    const secret = prompt('Enter admin access code:');
    if (secret) {
      window.location.href = `/api/maintenance-bypass?secret=${encodeURIComponent(secret)}`;
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-navy-950 flex items-center justify-center overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(30,48,104,0.4)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(155,14,32,0.12)_0%,transparent_50%)]" />

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center px-8 max-w-xl"
      >
        {/* Logo — hidden bypass trigger */}
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

        {/* Church name */}
        <p className="text-xs uppercase tracking-[0.25em] text-white/30 font-medium mb-6 font-nav">
          Aenon Church
        </p>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[0.95] mb-6">
          We&apos;ll be
          <br />
          right back.
        </h1>

        {/* Accent divider */}
        <div className="w-16 h-0.5 bg-accent-500 mx-auto mb-8" />

        {/* Message */}
        <p className="text-lg text-white/50 leading-relaxed mb-4 max-w-md mx-auto">
          Our website is currently undergoing scheduled maintenance to bring you
          a better experience.
        </p>
        <p className="text-sm text-white/30 leading-relaxed mb-12">
          We expect to be back shortly. Thank you for your patience.
        </p>

        {/* Service times pill */}
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-sm">
          <Clock className="w-4 h-4 text-accent-400" />
          <span className="text-white/50 text-sm font-nav">
            Sunday Services: 8 AM &middot; 10 AM &middot; 7 PM
          </span>
        </div>

        {/* Contact */}
        <div className="mt-8 flex items-center justify-center gap-2 text-white/20 text-xs">
          <Mail className="w-3.5 h-3.5" />
          <span>aenonchurch@gmail.com</span>
        </div>

        {/* Hidden bypass button — appears after 5 logo clicks */}
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
