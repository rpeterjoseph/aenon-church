'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Calendar, ArrowRight } from 'lucide-react';

const PROMO_MODAL_SEEN_KEY = 'aenon-promo-modal-seen';

export default function PromoModal() {
  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(PROMO_MODAL_SEEN_KEY, '1');
    } catch {
      // localStorage unavailable — modal just reappears next visit
    }
  };

  useEffect(() => {
    let alreadySeen = false;
    try {
      alreadySeen = localStorage.getItem(PROMO_MODAL_SEEN_KEY) === '1';
    } catch {
      alreadySeen = false;
    }
    if (alreadySeen) return;

    const timer = setTimeout(() => setOpen(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-modal-heading"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm animate-fade-in"
        onClick={close}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-navy-900 hover:bg-silver-100 transition-colors shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-10">
          <p className="label-text text-orange-500 mb-3">You&apos;re Invited</p>
          <h2 id="promo-modal-heading" className="heading-sm text-navy-900 mb-8">
            Mark your calendars.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* Conference 2026 — hero photo with dark overlay */}
            <Link
              href="/conference2026"
              onClick={close}
              className="group relative overflow-hidden rounded-2xl p-6 flex flex-col justify-between min-h-[200px] hover:shadow-lg transition-all duration-300"
            >
              <Image
                src="/images/conference-2026-hero.jpg"
                alt=""
                fill
                sizes="(min-width: 640px) 320px, 90vw"
                className="object-cover -z-10 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/50 to-navy-950/20 -z-10" />
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-white/15 text-orange-200 text-[10px] font-medium rounded-full uppercase tracking-wider backdrop-blur-sm mb-4">
                  Conference 2026
                </span>
                <h3 className="text-white font-bold text-lg leading-snug mb-2">
                  Christ-Centered Pastors &amp; Leaders Conference
                </h3>
                <div className="flex items-center gap-2 text-white/70 text-xs">
                  <Calendar className="w-3.5 h-3.5 text-orange-300" />
                  November 12&ndash;14, 2026
                </div>
              </div>
              <div className="relative z-10 flex items-center gap-2 text-orange-300 text-xs font-medium uppercase tracking-wider mt-4">
                Learn More
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Grace Festivals 2026 — hero photo with dark overlay */}
            <Link
              href="/gracefestivals2026"
              onClick={close}
              className="group relative overflow-hidden rounded-2xl p-6 flex flex-col justify-between min-h-[200px] hover:shadow-lg transition-all duration-300"
            >
              <Image
                src="/images/grace-festivals-2026-hero.jpg"
                alt=""
                fill
                sizes="(min-width: 640px) 320px, 90vw"
                className="object-cover -z-10 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/50 to-navy-950/20 -z-10" />
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-white/15 text-sky-200 text-[10px] font-medium rounded-full uppercase tracking-wider backdrop-blur-sm mb-4">
                  Aenon Events 2026
                </span>
                <h3 className="text-white font-bold text-lg leading-snug mb-2">
                  Grace Festivals
                </h3>
                <div className="flex items-center gap-2 text-white/70 text-xs">
                  <Calendar className="w-3.5 h-3.5" />
                  November 12&ndash;15, 2026 &middot; 6:00 PM
                </div>
              </div>
              <div className="relative z-10 flex items-center gap-2 text-white text-xs font-medium uppercase tracking-wider mt-4">
                Learn More
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
