import Link from 'next/link';
import Image from 'next/image';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
} from 'lucide-react';

const quickLinks = [
  { label: 'About', href: '/about' },
  { label: 'Sermons', href: '/sermons' },
  { label: 'Ministries', href: '/ministries' },
  { label: 'Events', href: '/events' },
  { label: 'What We Believe', href: '/believe' },
  { label: 'Contact', href: '/contact' },
];

const connectLinks = [
  { label: 'Give Online', href: '/give' },
  { label: 'Volunteer', href: '/contact' },
  { label: 'Prayer Request', href: '/contact' },
  { label: 'Watch Online', href: 'https://www.youtube.com/aenonchurch' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: 'https://www.youtube.com/aenonchurch', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white noise-bg">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto section-padding py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/logo.png"
                alt="Aenon Church Logo"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-lg font-bold tracking-tight font-nav">AENON CHURCH</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              A Christ-centered community in Tarnaka, Hyderabad committed to
              glorifying God through worship, discipleship, and fellowship.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-nav text-sm font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-nav text-sm font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">
              Connect
            </h4>
            <ul className="space-y-3">
              {connectLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-nav text-sm font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">
              Visit Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white/40 mt-1 flex-shrink-0" />
                <p className="text-white/60 text-sm leading-relaxed">
                  Tarnaka, Secunderabad,
                  <br />
                  Hyderabad, Telangana, India
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-white/40 flex-shrink-0" />
                <a
                  href="tel:+919849613247"
                  className="text-white/60 hover:text-white transition-colors text-sm"
                >
                  +91 98496 13247
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-white/40 flex-shrink-0" />
                <a
                  href="mailto:aenonchurch@gmail.com"
                  className="text-white/60 hover:text-white transition-colors text-sm"
                >
                  aenonchurch@gmail.com
                </a>
              </div>
            </div>

            {/* Service Times */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs uppercase tracking-[0.2em] text-white/30 mb-3">
                Sundays
              </p>
              <p className="text-white/70 text-sm font-medium">
                8:00 AM &middot; 11:00 AM &middot; 7:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto section-padding py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Aenon Church. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            For the glory of God alone.
          </p>
        </div>
      </div>
    </footer>
  );
}
