'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ArrowRight } from 'lucide-react';

const DISMISS_KEY = 'gf2026-popup-dismissed';

export default function GraceFestivalPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY)) return;
    } catch {
      return;
    }
    const timer = setTimeout(() => setOpen(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // ignore — worst case the popup shows again next visit
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9990] bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-2xl overflow-hidden bg-navy-950 noise-bg border border-white/10 shadow-2xl"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Poster image — hides gracefully until a real one is added */}
            <div className="aspect-[16/9] bg-gradient-to-br from-navy-800 to-navy-950">
              <img
                src="/images/grace-festival-2026.jpg"
                alt="Grace Festival 2026"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>

            <div className="p-8 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-accent-400 font-medium mb-4">
                Save the Date
              </p>
              <h2 className="text-3xl font-bold text-white mb-3">
                Grace Festival 2026
              </h2>
              <div className="flex items-center justify-center gap-2 text-white/50 text-sm mb-6">
                <Calendar className="w-4 h-4" />
                <span>November 2026 &middot; Aenon Church</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                Join us for a special season of worship, the Word, and community
                as we come together for Grace Festival 2026. More details
                coming soon.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/events" onClick={close} className="btn-white !text-xs">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={close}
                  className="inline-flex items-center justify-center px-6 py-3 text-white/60 text-xs font-medium uppercase tracking-[0.15em] rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
