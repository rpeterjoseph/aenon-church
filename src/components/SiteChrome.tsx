'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import AnnouncementBar from './AnnouncementBar';

const ANNOUNCEMENT_DISMISSED_KEY = 'aenon-grace-fest-announcement-dismissed';

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(ANNOUNCEMENT_DISMISSED_KEY) === '1');
    } catch {
      setDismissed(false);
    }
  }, []);

  const showBar = pathname === '/' && !dismissed;

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(ANNOUNCEMENT_DISMISSED_KEY, '1');
    } catch {
      // localStorage unavailable (private mode, etc.) — dismissal just won't persist
    }
  };

  return (
    <>
      {showBar && <AnnouncementBar onDismiss={handleDismiss} />}
      <Navbar offsetTop={showBar} />
      {children}
    </>
  );
}
