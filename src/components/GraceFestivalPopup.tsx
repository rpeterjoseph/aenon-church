'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

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
            className="relative w-full max-w-sm rounded-2xl overflow-hidden bg-navy-950 noise-bg border border-white/10 shadow-2xl"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-[1035/1600] bg-gradient-to-br from-navy-800 to-navy-950">
              <Image
                src="/images/grace-festival-2026.jpg"
                alt="Grace Festival 2026 — November 12-15, A.N.R. Gardens, Nacharam, Hyderabad"
                fill
                sizes="(min-width: 640px) 384px, 90vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="p-6 text-center">
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Nov 12&ndash;15 &middot; 6 PM daily &middot; A.N.R. Gardens, Nacharam
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/grace-festival" onClick={close} className="btn-white !text-xs">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
