'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

interface SubLink {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  sub?: SubLink[];
}

const navLinks: NavItem[] = [
  {
    label: 'ABOUT',
    href: '/about',
    sub: [
      { label: 'ABOUT AENON', href: '/about' },
      { label: 'VISION & MISSION', href: '/about/vision' },
      { label: 'WHAT TO EXPECT', href: '/about/expect' },
      { label: 'LEADERSHIP', href: '/about/leadership' },
    ],
  },
  { label: 'SERMONS', href: '/sermons' },
  {
    label: 'MINISTRIES',
    href: '/ministries',
    sub: [
      { label: 'MENS MINISTRY', href: '/ministries/mens' },
      { label: 'WOMENS MINISTRY', href: '/ministries/womens' },
      { label: 'YOUNG ADULT', href: '/ministries/youth' },
      { label: 'KIDS', href: '/ministries/kids' },
    ],
  },
  { label: 'EVENTS', href: '/events' },
  {
    label: 'WHAT WE BELIEVE',
    href: '/believe',
    sub: [
      { label: 'WHAT IS THE GOSPEL?', href: '/believe/gospel' },
      { label: 'STATEMENT OF FAITH', href: '/believe/statement' },
    ],
  },
  { label: 'CONTACT', href: '/contact' },
];

function DesktopDropdown({
  item,
  scrolled,
}: {
  item: NavItem;
  scrolled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link
        href={item.href}
        className={`font-nav text-[11px] xl:text-xs font-medium tracking-[0.1em] transition-colors duration-300 hover:opacity-70 flex items-center gap-1 whitespace-nowrap ${
          scrolled ? 'text-navy-900' : 'text-white/90'
        }`}
      >
        {item.label}
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </Link>

      {/* Dropdown Panel */}
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-1 pointer-events-none'
        }`}
      >
        <div className="bg-white rounded-xl shadow-xl border border-silver-200/60 py-3 min-w-[220px]">
          {item.sub!.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-2.5 font-nav text-[11px] font-medium tracking-[0.1em] text-navy-900/70 hover:text-accent-500 hover:bg-silver-100/60 transition-colors"
            >
              {sub.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileAccordion({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  if (!item.sub) {
    return (
      <Link
        href={item.href}
        onClick={onNavigate}
        className="font-nav text-2xl sm:text-3xl md:text-4xl font-bold text-white py-3 sm:py-4 border-b border-white/10 hover:text-silver-300 transition-all tracking-wide block"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full font-nav text-2xl sm:text-3xl md:text-4xl font-bold text-white py-3 sm:py-4 hover:text-silver-300 transition-all tracking-wide flex items-center justify-between"
      >
        {item.label}
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 pb-4' : 'max-h-0'
        }`}
      >
        <div className="pl-4 space-y-1">
          {item.sub.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href}
              onClick={onNavigate}
              className="block font-nav text-base sm:text-lg font-medium text-white/50 hover:text-accent-400 transition-colors py-2 tracking-wide"
            >
              {sub.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 py-3 md:py-4"
      >
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-5 lg:px-6 flex items-center justify-between rounded-full border transition-all duration-500 ${
            scrolled
              ? 'bg-white/50 backdrop-blur-lg shadow-lg border-white/25 py-2.5'
              : 'bg-white/[0.05] backdrop-blur-lg border-white/10 py-3'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
            <Image
              src="/logo.png"
              alt="Aenon Church Logo"
              width={36}
              height={36}
              className="w-8 h-8 rounded-full object-cover"
              priority
            />
            <span
              className={`text-sm font-medium tracking-tight transition-colors duration-300 font-nav ${
                scrolled ? 'text-navy-900' : 'text-white'
              }`}
            >
              AENON CHURCH
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) =>
              link.sub ? (
                <DesktopDropdown
                  key={link.href}
                  item={link}
                  scrolled={scrolled}
                />
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-nav text-[11px] xl:text-xs font-medium tracking-[0.1em] transition-colors duration-300 hover:opacity-70 whitespace-nowrap ${
                    scrolled ? 'text-navy-900' : 'text-white/90'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              href="/give"
              className="btn-primary !py-2 !px-5 !text-[11px] xl:!text-xs font-nav !gap-0 !rounded-full shrink-0"
            >
              GIVING
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 transition-colors ${
              scrolled ? 'text-navy-900' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-navy-950 transition-all duration-500 lg:hidden ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col justify-center h-full px-8 sm:px-12 overflow-y-auto py-24">
          {navLinks.map((link, i) => (
            <MobileAccordion
              key={link.href}
              item={link}
              onNavigate={() => setMobileOpen(false)}
            />
          ))}
          <Link
            href="/give"
            onClick={() => setMobileOpen(false)}
            className="btn-primary mt-8 sm:mt-10 justify-center !text-sm font-nav tracking-wider"
          >
            GIVING
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
