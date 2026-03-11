'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X, Eye } from 'lucide-react';

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

export default function MaintenanceCountdown() {
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const expiresAt = getCookie('aenon-bypass-expires');
    if (!expiresAt) return;

    const expiryTime = parseInt(expiresAt, 10);
    if (isNaN(expiryTime)) return;

    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((expiryTime - now) / 1000));
      setRemainingSeconds(diff);

      if (diff <= 0) {
        window.location.href = '/maintenance';
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Don't render if no active bypass, dismissed, or maintenance off
  if (remainingSeconds === null || dismissed) return null;
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE !== 'true') return null;

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const urgencyColor =
    remainingSeconds > 120
      ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
      : remainingSeconds > 60
        ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
        : 'bg-accent-500/20 border-accent-500/30 text-accent-400';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-6 right-6 z-[9998]"
      >
        <div
          className={`flex items-center gap-3 px-4 py-2.5 rounded-full border backdrop-blur-lg shadow-2xl ${urgencyColor}`}
        >
          <Eye className="w-4 h-4" />
          <span className="text-xs font-medium font-nav uppercase tracking-wider">
            Preview
          </span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-sm font-bold tabular-nums font-nav">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </span>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="ml-1 opacity-50 hover:opacity-100 transition-opacity"
            aria-label="Dismiss countdown"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
