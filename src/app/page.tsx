'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LatestSermonEmbed from '@/components/LatestSermonEmbed';
import { getUpcomingEvents } from '@/lib/events';
import {
  ChevronRight,
  Play,
  MapPin,
  Clock,
  Calendar,
  Users,
  Heart,
  BookOpen,
  ArrowRight,
  ArrowUpRight,
  Sun,
  Moon,
  Sunrise,
  Flame,
} from 'lucide-react';

export default function Home() {
  const upcomingEvents = useMemo(() => getUpcomingEvents(3), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ============================================= */}
      {/* HERO SECTION - Full Screen Cinematic */}
      {/* ============================================= */}
      <section className="relative h-[100svh] min-h-[600px] md:min-h-[700px] flex items-end overflow-hidden">
        {/* Background photo - grayscale */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg2.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        {/* Navy blue overlay */}
        <div className="absolute inset-0 bg-navy-950/40" />
        {/* Bottom gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full section-padding pb-16 sm:pb-20 md:pb-28">
          <div className="max-w-3xl">
            <p className="label-text text-white/50 mb-4 sm:mb-6 animate-fade-in text-[10px] sm:text-xs md:text-sm">
              Aenon Church &mdash; Tarnaka, Hyderabad
            </p>
            <h1 className="text-6xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.95] text-white mb-6 sm:mb-8 animate-slide-up">
              Welcome
              <br />
              Home.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-lg mb-8 sm:mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              A place to belong. A place to grow. A community rooted in
              Christ and committed to His purpose.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Link href="/about" className="btn-white justify-center sm:justify-start text-xs sm:text-sm">
                Plan Your Visit
                <ChevronRight className="w-4 h-4" />
              </Link>
              <a
                href="https://www.youtube.com/aenonchurch"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center sm:justify-start gap-3 px-6 sm:px-8 py-3 sm:py-4 text-white/80 text-xs sm:text-sm font-medium uppercase tracking-[0.15em] rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300"
              >
                <Play className="w-4 h-4" fill="currentColor" />
                Watch Online
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* WELCOME / ABOUT INTRO */}
      {/* ============================================= */}
      <section className="section-gap bg-white">
        <div className="max-w-7xl mx-auto section-padding">
          {/* Top: Heading + Description */}
          <div className="max-w-3xl mb-16">
            <p className="reveal label-text text-navy-900/40 mb-4">About Aenon</p>
            <h2 className="reveal heading-lg text-navy-900 mb-8">
              We are here
              <br />
              to glorify God.
            </h2>
            <div className="reveal reveal-delay-1 w-16 h-0.5 bg-accent-500 mb-8" />
            <p className="reveal reveal-delay-2 body-lg">
              Aenon Church is a Christ-centered community in the heart of
              Hyderabad. We gather to worship, learn, and grow together
              in faith — building a family that reflects the love of Jesus.
            </p>
          </div>

          {/* Service Times */}
          <div className="reveal reveal-delay-1 bg-silver-100 rounded-2xl p-8 md:p-14">
            <p className="text-xs uppercase tracking-[0.2em] text-navy-900/40 font-medium mb-10">Service Times</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-12">
              {[
                { day: 'Sunday', service: 'Worship Services', time: '8am · 11am · 7pm' },
                { day: 'Wednesday', service: 'Bible Study', time: '7pm' },
                { day: 'Friday', service: 'Prayer Meeting', time: '11am' },
              ].map((item) => (
                <div key={item.day}>
                  <p className="text-navy-900/60 font-semibold text-xs md:text-sm uppercase tracking-wider mb-4">
                    {item.day}
                  </p>
                  <p className="text-navy-900 font-bold text-3xl md:text-4xl tabular-nums leading-none mb-4">
                    {item.time}
                  </p>
                  <div className="w-8 h-0.5 bg-accent-500 mb-3" />
                  <p className="text-silver-400 text-sm">{item.service}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 pt-6 border-t border-silver-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="text-silver-400 text-xs leading-relaxed">
                In-person &amp; YouTube Live &middot; All are welcome
              </p>
              <p className="text-silver-400 text-xs leading-relaxed">
                Youth Meeting &middot; Saturdays at 7pm
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* DIVIDER LINE */}
      {/* ============================================= */}
      <div className="max-w-7xl mx-auto section-padding">
        <div className="divider" />
      </div>

      {/* ============================================= */}
      {/* STATS SECTION - Inspired by digital guild */}
      {/* ============================================= */}
      <section className="bg-navy-950 noise-bg">
        <div className="max-w-7xl mx-auto section-padding py-20 md:py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { number: '37+', label: 'Years of Ministry' },
              { number: '3', label: 'Sunday Services' },
              { number: '4', label: 'Weekly Gatherings' },
              { number: '6', label: 'Active Ministries' },
            ].map((stat, i) => (
              <div key={stat.label} className={`reveal reveal-delay-${i} text-center md:text-left`}>
                <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                  {stat.number}
                </p>
                <div className="w-8 h-0.5 bg-accent-500 mb-3 mx-auto md:mx-0" />
                <p className="text-white/40 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* LATEST SERMON - YouTube Integration */}
      {/* ============================================= */}
      <section className="section-gap bg-silver-100">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Info */}
            <div>
              <p className="reveal label-text text-navy-900/40 mb-4">Latest Sermon</p>
              <h2 className="reveal heading-lg text-navy-900 mb-6">
                Catch up on
                <br />
                the Word.
              </h2>
              <div className="reveal reveal-delay-1 w-16 h-0.5 bg-accent-500 mb-6" />
              <p className="reveal reveal-delay-2 body-lg mb-4">
                Missed a Sunday? No worries. Watch our latest messages
                and let the Word of God speak into your life, wherever you
                are.
              </p>
              <p className="reveal reveal-delay-3 body-md mb-10">
                New sermons uploaded every week. Subscribe to our YouTube channel
                so you never miss a message.
              </p>
              <div className="reveal reveal-delay-4 flex flex-wrap gap-4">
                <Link href="/sermons" className="btn-primary">
                  All Sermons
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://www.youtube.com/aenonchurch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  YouTube Channel
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* YouTube Embed */}
            <div className="reveal reveal-delay-1">
              <LatestSermonEmbed />
              <div className="mt-4 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
                <span className="text-sm text-silver-400">
                  Live every Sunday on YouTube
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* MINISTRIES PREVIEW */}
      {/* ============================================= */}
      <section className="section-gap bg-white">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <p className="reveal label-text text-navy-900/40 mb-4">Ministries</p>
              <h2 className="reveal heading-md text-navy-900">
                Find your community.
              </h2>
            </div>
            <div className="reveal mt-6 md:mt-0">
              <Link href="/ministries" className="btn-outline !py-3 !px-6 !text-xs">
                View All Ministries
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Ministry Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Aenon Beloved Men',
                desc: 'Building men of faith through accountability, study, and brotherhood.',
                icon: Users,
                logo: '',
                tag: 'Men',
                gradient: 'from-navy-800 to-navy-950',
                href: '/ministries/mens',
              },
              {
                title: 'Aenon Lovely Women',
                desc: 'Empowering women to grow in faith, friendship, and spiritual depth.',
                icon: Heart,
                logo: '',
                tag: 'Women',
                gradient: 'from-navy-700 to-navy-900',
                href: '/ministries/womens',
              },
              {
                title: 'Aenon Young Adults',
                desc: 'A vibrant community for young adults to discover purpose and passion.',
                icon: Sun,
                logo: '',
                tag: 'Young Adults',
                gradient: 'from-navy-600 to-navy-800',
                href: '/ministries/young-adults',
              },
              {
                title: 'Aenon Kids',
                desc: 'A safe, fun, and engaging environment for children to learn about Jesus.',
                icon: BookOpen,
                logo: '',
                tag: 'Kids',
                gradient: 'from-navy-700 to-navy-950',
                href: '/ministries/kids',
              },
              {
                title: 'Aenon Youth',
                desc: 'Helping teens grow in faith, build lasting friendships, and live boldly for Christ.',
                icon: Flame,
                logo: '',
                href: '/ministries/youth',
                tag: 'Youth',
                gradient: 'from-navy-900 to-navy-950',
              },
            ].map((ministry, i) => (
              <Link
                key={ministry.title}
                href={ministry.href}
                className={`reveal reveal-delay-${i} group`}
              >
                <div className={`relative overflow-hidden rounded-2xl mb-5 bg-gradient-to-br ${ministry.gradient} noise-bg aspect-[4/5] flex flex-col justify-between p-7 md:p-10`}>
                  {/* Decorative glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/[0.03] rounded-full translate-y-1/2 -translate-x-1/2" />
                  <div className="relative z-10">
                    <span className="inline-block px-3 py-1 bg-white/10 text-white/70 text-xs font-medium rounded-full uppercase tracking-wider backdrop-blur-sm">
                      {ministry.tag}
                    </span>
                  </div>
                  <div className="relative z-10">
                    {ministry.logo ? (
                      <div className="relative w-14 h-14 md:w-16 md:h-16 mb-4">
                        <Image
                          src={ministry.logo}
                          alt={`${ministry.title} logo`}
                          fill
                          sizes="64px"
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <ministry.icon className="w-9 h-9 md:w-10 md:h-10 text-white/30 mb-4 group-hover:text-white/50 transition-colors" />
                    )}
                    <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors">
                      {ministry.desc}
                    </p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-1 group-hover:text-accent-500 transition-colors flex items-center gap-2">
                  {ministry.title}
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent-500" />
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* CTA - Dark Cinematic Section */}
      {/* ============================================= */}
      <section className="relative py-32 md:py-44 overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-navy-950" />
        {/* Subtle radial accents */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(30,48,104,0.4)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(22,36,82,0.3)_0%,transparent_50%)]" />
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute inset-0 noise-bg" />

        <div className="relative z-10 max-w-4xl mx-auto text-center section-padding">
          <p className="reveal label-text text-white/40 mb-6">Join Us This Sunday</p>
          <h2 className="reveal heading-lg text-white mb-8">
            Come experience
            <br />
            something real.
          </h2>
          <p className="reveal reveal-delay-1 text-white/50 text-lg max-w-xl mx-auto mb-10">
            Whether it&apos;s your first time or your hundredth, you&apos;re
            welcome here. We&apos;d love to meet you.
          </p>
          <div className="reveal reveal-delay-2 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-white">
              Plan Your Visit
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/give"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white text-sm font-medium uppercase tracking-[0.15em] rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Give Online
              <Heart className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* ANNOUNCEMENTS */}
      {/* ============================================= */}
      <section className="section-gap bg-white">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <p className="reveal label-text text-navy-900/40 mb-4">Announcements</p>
              <h2 className="reveal heading-md text-navy-900">
                Stay connected.
              </h2>
            </div>
            <div className="reveal mt-6 md:mt-0">
              <Link href="/events" className="btn-outline !py-3 !px-6 !text-xs">
                All Events
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Announcement Items - Editorial style like Clova */}
          <div className="space-y-0">
            {upcomingEvents.map((event, i) => (
              <Link
                key={event.id}
                href="/events"
                className={`reveal reveal-delay-${i} flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-silver-200 group cursor-pointer hover:bg-silver-100/50 px-4 -mx-4 rounded-xl transition-colors`}
              >
                <div className="flex items-start md:items-center gap-6 flex-1">
                  <span className="text-sm text-silver-400 font-medium min-w-[80px]">
                    {event.shortDateLabel}
                  </span>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-navy-900 group-hover:text-accent-500 transition-colors">
                        {event.title}
                      </h3>
                      <span className="px-2 py-0.5 bg-accent-500/10 text-accent-500 text-[10px] font-medium uppercase tracking-wider rounded-full">
                        {event.tag}
                      </span>
                    </div>
                    <p className="text-silver-400 text-sm">{event.desc}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-silver-300 group-hover:text-accent-500 group-hover:translate-x-1 transition-all mt-4 md:mt-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* VOLUNTEERING OPPORTUNITIES */}
      {/* ============================================= */}
      <section className="section-gap bg-white">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left - Text */}
            <div>
              <p className="reveal label-text text-accent-500 mb-4">Ways to Serve</p>
              <h2 className="reveal heading-md text-navy-900 mb-8">
                Volunteering
                <br />
                Opportunities
              </h2>
              <p className="reveal reveal-delay-1 body-lg mb-10">
                If you want to use your skills to serve the Lord and become a
                volunteer, you can be part of our Vision Team. Fill out the
                application and we will contact you.
              </p>
              <div className="reveal reveal-delay-2">
                <Link href="/contact" className="btn-outline">
                  Volunteer Application
                </Link>
              </div>
            </div>

            {/* Right - Image */}
            <div className="reveal reveal-delay-1">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-silver-200 to-silver-100">
                <Image
                  src="/images/volunteer.jpeg"
                  alt="Volunteer serving at Aenon Church"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* MAP / VISIT US */}
      {/* ============================================= */}
      <section className="bg-silver-100">
        <div className="max-w-7xl mx-auto section-padding section-gap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Map */}
            <div className="reveal order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5115.09529953072!2d78.53534907627811!3d17.43180478346308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9960ffffffff%3A0xaf094faf3bce4d9e!2sAenon%20Church!5e1!3m2!1sen!2sin!4v1789336008690!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Aenon Church Location"
                />
              </div>
            </div>

            {/* Info */}
            <div className="order-1 lg:order-2">
              <p className="reveal label-text text-navy-900/40 mb-4">Visit Us</p>
              <h2 className="reveal heading-md text-navy-900 mb-8">
                We&apos;d love to
                <br />
                meet you.
              </h2>
              <div className="reveal reveal-delay-1 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent-500" />
                  </div>
                  <div>
                    <p className="font-medium text-navy-900 mb-1">Our Location</p>
                    <p className="text-silver-400 text-sm">
                      Tarnaka, Secunderabad,<br />
                      Hyderabad, Telangana, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-500/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-accent-500" />
                  </div>
                  <div>
                    <p className="font-medium text-navy-900 mb-1">Sunday Services</p>
                    <p className="text-silver-400 text-sm">
                      8:00 AM &middot; 11:00 AM &middot; 7:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-500/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-accent-500" />
                  </div>
                  <div>
                    <p className="font-medium text-navy-900 mb-1">Midweek &amp; More</p>
                    <p className="text-silver-400 text-sm">
                      Bible Study Wed 7PM &middot; Prayer Fri 11AM &middot; Youth Sat 7PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="reveal reveal-delay-2 mt-10">
                <Link href="/contact" className="btn-primary">
                  Get Directions
                  <MapPin className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
