'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronRight } from 'lucide-react';

const navLinks = [
  { label: 'ABOUT', href: '/about' },
  { label: 'SERMONS', href: '/sermons' },
  { label: 'MINISTRIES', href: '/ministries' },
  { label: 'EVENTS', href: '/events' },
  { label: 'WHAT WE BELIEVE', href: '/believe' },
  { label: 'CONTACT', href: '/contact' },
];

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-sm py-3 md:py-4'
            : 'bg-transparent py-4 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <Image
              src="/logo.png"
              alt="Aenon Church Logo"
              width={40}
              height={40}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
              priority
            />
            <span
              className={`text-base sm:text-lg font-bold tracking-tight transition-colors duration-300 font-nav ${
                scrolled ? 'text-navy-900' : 'text-white'
              }`}
            >
              AENON CHURCH
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-nav text-[11px] xl:text-xs font-semibold tracking-[0.12em] transition-colors duration-300 hover:opacity-70 ${
                  scrolled ? 'text-navy-900' : 'text-white/90'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/give" className="btn-primary !py-2.5 !px-5 !text-[10px] xl:!text-xs font-nav !gap-0">
              GIVE
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
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
        <div className="flex flex-col justify-center h-full px-8 sm:px-12">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-nav text-2xl sm:text-3xl md:text-4xl font-bold text-white py-3 sm:py-4 border-b border-white/10 hover:text-silver-300 transition-all tracking-wide"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/give"
            onClick={() => setMobileOpen(false)}
            className="btn-primary mt-8 sm:mt-10 justify-center !text-sm font-nav tracking-wider"
          >
            GIVE ONLINE
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
