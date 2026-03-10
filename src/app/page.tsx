'use client';

import { useEffect } from 'react';
import Link from 'next/link';
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
} from 'lucide-react';

export default function Home() {
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
        {/* Background - Deep navy with gradient */}
        <div className="absolute inset-0 bg-navy-950" />
        {/* Radial glow accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(30,48,104,0.5)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(15,27,61,0.6)_0%,transparent_50%)]" />
        {/* Subtle cross pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        {/* Bottom gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full section-padding pb-16 sm:pb-20 md:pb-28">
          <div className="max-w-3xl">
            <p className="label-text text-white/50 mb-4 sm:mb-6 animate-fade-in text-[10px] sm:text-xs md:text-sm">
              Aenon Church &mdash; Tarnaka, Hyderabad
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.95] text-white mb-6 sm:mb-8 animate-slide-up">
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

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-white/30 text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
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

          {/* Bottom: Two column cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Card - Mission statement */}
            <div className="reveal reveal-delay-1 bg-navy-950 text-white rounded-2xl p-8 md:p-12 flex flex-col justify-between noise-bg min-h-[280px]">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-6 font-medium">Our Heart</p>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                  Whether you are taking your first step of faith or have been walking
                  with Christ for years, there is a place for you here. Come as you
                  are and experience the transforming power of God&apos;s grace.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/about" className="inline-flex items-center gap-2 text-accent-400 text-sm font-medium uppercase tracking-[0.15em] hover:text-accent-300 transition-colors group">
                  Our Story
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Card - Service times */}
            <div className="reveal reveal-delay-2 bg-silver-100 rounded-2xl p-8 md:p-10">
              <p className="text-xs uppercase tracking-[0.2em] text-navy-900/40 font-medium mb-8">Service Times</p>
              <div className="space-y-0 divide-y divide-silver-200">
                {[
                  { day: 'Sunday', service: 'Worship Services', time: '8 AM  ·  10 AM  ·  7 PM' },
                  { day: 'Wednesday', service: 'Bible Study', time: '7:00 PM' },
                  { day: 'Friday', service: 'Prayer Meeting', time: '11:00 AM' },
                  { day: 'Saturday', service: 'Youth Meeting', time: '7:00 PM' },
                ].map((item) => (
                  <div key={item.day} className="flex items-baseline justify-between py-4 first:pt-0 last:pb-0">
                    <div>
                      <p className="text-navy-900 font-bold text-sm md:text-base">{item.day}</p>
                      <p className="text-silver-400 text-xs mt-0.5">{item.service}</p>
                    </div>
                    <p className="text-navy-900 font-medium text-sm md:text-base tabular-nums">{item.time}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-silver-200">
                <p className="text-silver-400 text-xs leading-relaxed">
                  In-person & YouTube Live &middot; All are welcome
                </p>
              </div>
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
              <div className="youtube-container shadow-2xl">
                <iframe
                  src="https://www.youtube.com/embed?listType=user_uploads&list=aenonchurch"
                  title="Latest Sermon - Aenon Church"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Men's Ministry",
                desc: 'Building men of faith through accountability, study, and brotherhood.',
                icon: Users,
                tag: 'Men',
                gradient: 'from-navy-800 to-navy-950',
              },
              {
                title: "Women's Ministry",
                desc: 'Empowering women to grow in faith, friendship, and spiritual depth.',
                icon: Heart,
                tag: 'Women',
                gradient: 'from-navy-700 to-navy-900',
              },
              {
                title: 'Young Adults',
                desc: 'A vibrant community for young adults to discover purpose and passion.',
                icon: Sun,
                tag: 'Youth',
                gradient: 'from-navy-600 to-navy-800',
              },
              {
                title: 'Kids Ministry',
                desc: 'A safe, fun, and engaging environment for children to learn about Jesus.',
                icon: BookOpen,
                tag: 'Kids',
                gradient: 'from-navy-700 to-navy-950',
              },
            ].map((ministry, i) => (
              <Link
                key={ministry.title}
                href="/ministries"
                className={`reveal reveal-delay-${i} group`}
              >
                <div className={`relative overflow-hidden rounded-2xl mb-5 bg-gradient-to-br ${ministry.gradient} noise-bg aspect-[4/5] flex flex-col justify-between p-6 md:p-8`}>
                  {/* Decorative glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/[0.03] rounded-full translate-y-1/2 -translate-x-1/2" />
                  <div className="relative z-10">
                    <span className="inline-block px-3 py-1 bg-white/10 text-white/70 text-xs font-medium rounded-full uppercase tracking-wider backdrop-blur-sm">
                      {ministry.tag}
                    </span>
                  </div>
                  <div className="relative z-10">
                    <ministry.icon className="w-8 h-8 text-white/30 mb-4 group-hover:text-white/50 transition-colors" />
                    <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors">
                      {ministry.desc}
                    </p>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-1 group-hover:text-accent-500 transition-colors flex items-center gap-2">
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
            {[
              {
                date: 'Mar 2026',
                title: 'Easter Sunday Celebration',
                desc: 'Join us for a special Easter worship service with the whole church family.',
                tag: 'Upcoming',
              },
              {
                date: 'Weekly',
                title: 'Wednesday Bible Study Series',
                desc: 'New series starting — dive deeper into the Book of Acts with us.',
                tag: 'Recurring',
              },
              {
                date: 'Open',
                title: 'Volunteer Sign-Ups',
                desc: 'Serve in worship, kids ministry, hospitality, and more. Apply today.',
                tag: 'Now Open',
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`reveal reveal-delay-${i} flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-silver-200 group cursor-pointer hover:bg-silver-100/50 px-4 -mx-4 rounded-xl transition-colors`}
              >
                <div className="flex items-start md:items-center gap-6 flex-1">
                  <span className="text-sm text-silver-400 font-medium min-w-[80px]">
                    {item.date}
                  </span>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-navy-900 group-hover:text-accent-500 transition-colors">
                        {item.title}
                      </h3>
                      <span className="px-2 py-0.5 bg-accent-500/10 text-accent-500 text-[10px] font-medium uppercase tracking-wider rounded-full">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-silver-400 text-sm">{item.desc}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-silver-300 group-hover:text-accent-500 group-hover:translate-x-1 transition-all mt-4 md:mt-0" />
              </div>
            ))}
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2!2d78.5412!3d17.4326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sTarnaka%2C%20Secunderabad%2C%20Hyderabad!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
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
                      8:00 AM &middot; 10:00 AM &middot; 7:00 PM
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
