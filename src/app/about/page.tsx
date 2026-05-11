'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Heart, BookOpen, Users, Globe } from 'lucide-react';

const historyItems = [
  { year: '1989', img: '/images/history/history-1989.jpg', title: 'The Beginning', desc: 'Aenon Church was founded with a small group of believers with a vision to glorify God and reach Hyderabad with the Gospel.' },
  { year: '1996', img: '/images/history/history-1996.jpg', title: 'Title coming soon', desc: 'Description coming soon.' },
  { year: '1999', img: null, title: 'Title coming soon', desc: 'Description coming soon.' },
  { year: '2003', img: '/images/history/history-2003.jpg', title: 'Title coming soon', desc: 'Description coming soon.' },
  { year: '2004', img: '/images/history/history-2004.jpg', title: 'Title coming soon', desc: 'Description coming soon.' },
  { year: '2005', img: '/images/history/history-2005.jpg', title: 'Title coming soon', desc: 'Description coming soon.' },
  { year: '2006', img: '/images/history/history-2006.jpg', title: 'Title coming soon', desc: 'Description coming soon.' },
  { year: '2007', img: '/images/history/history-2007.jpg', title: 'Title coming soon', desc: 'Description coming soon.' },
  { year: '2009', img: null, title: 'Title coming soon', desc: 'Description coming soon.' },
  { year: '2012', img: null, title: 'Title coming soon', desc: 'Description coming soon.' },
  { year: '2015', img: null, title: 'Title coming soon', desc: 'Description coming soon.' },
  { year: '2017', img: null, title: 'Title coming soon', desc: 'Description coming soon.' },
  { year: '2020', img: null, title: 'Title coming soon', desc: 'Description coming soon.' },
  { year: '2024', img: null, title: 'Title coming soon', desc: 'Description coming soon.' },
  { year: '2026', img: null, title: 'Today', desc: 'With three Sunday services and a thriving weekly program, Aenon continues to grow and glorify God in Tarnaka.' },
];

export default function AboutPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-navy-950 noise-bg overflow-hidden">
        <div className="max-w-7xl mx-auto section-padding relative z-10">
          <p className="label-text text-white/40 mb-6">About Us</p>
          <h1 className="heading-xl text-white max-w-3xl">
            Our story,
            <br />
            His glory.
          </h1>
          <p className="text-xl text-white/50 max-w-xl mt-8">
            Rooted in faith, growing in love, and reaching the community
            with the hope of Jesus Christ since day one.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-gap bg-white">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="reveal label-text text-navy-900/40 mb-4">Our Beginning</p>
              <h2 className="reveal heading-md text-navy-900 mb-8">
                From small beginnings
                to a thriving community.
              </h2>
              <p className="reveal reveal-delay-1 body-lg mb-6">
                What began as a small gathering of believers has grown into a vibrant,
                multi-generational church family. Aenon Church was founded with a
                simple vision: to glorify God and make disciples of Jesus Christ.
              </p>
              <p className="reveal reveal-delay-2 body-md mb-6">
                Over the years, God has been faithful. He has drawn people from all
                walks of life into this community — united by one faith, one baptism,
                and one Lord.
              </p>
              <p className="reveal reveal-delay-3 body-md">
                Today, Aenon Church continues to grow as a beacon of hope in Tarnaka,
                Hyderabad, welcoming everyone who seeks to know God more deeply.
              </p>
            </div>
            <div className="reveal reveal-delay-1">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-navy-800 to-navy-950 noise-bg relative overflow-hidden flex items-center justify-center">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.03] rounded-full -translate-y-1/3 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/[0.02] rounded-full translate-y-1/3 -translate-x-1/3" />
                <div className="relative z-10 text-center px-8">
                  <p className="text-6xl md:text-8xl font-bold text-white/10 mb-4">37+</p>
                  <div className="w-12 h-0.5 bg-accent-500 mx-auto mb-4" />
                  <p className="text-white/40 text-sm uppercase tracking-[0.2em] font-nav">Years of faithful ministry</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Church History Timeline */}
      <section className="section-gap bg-silver-100">
        {/* Heading */}
        <div className="max-w-6xl mx-auto section-padding mb-16">
          <p className="reveal label-text text-navy-900/40 mb-4">Our History</p>
          <h2 className="reveal heading-md text-navy-900">
            Faithful through
            <br />
            the years.
          </h2>
        </div>

        {/* Mobile timeline */}
        <div className="md:hidden max-w-6xl mx-auto section-padding">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-silver-200" />
            <div className="space-y-16">
              {historyItems.map((item, i) => (
                <div key={item.year} className={`reveal reveal-delay-${i % 3} relative pl-12`}>
                  <div className="absolute left-[13px] top-2 w-3 h-3 rounded-full bg-accent-500 border-2 border-white z-10" />
                  <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-navy-800 to-navy-950 mb-5 overflow-hidden flex items-center justify-center border border-white/5">
                    {item.img ? (
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <p className="text-white/20 text-xs uppercase tracking-widest">Image coming soon</p>
                    )}
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-accent-500 font-semibold mb-2">{item.year}</p>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">{item.title}</h3>
                  <p className="text-silver-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop timeline — full bleed alternating */}
        <div className="hidden md:block relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-silver-200 -translate-x-px z-10" />

          <div className="space-y-6 px-[2.5%]">
            {historyItems.map((item, i) => {
              const isEven = i % 2 === 0;
              const ImageBlock = (
                <div className="w-1/2 overflow-hidden bg-gradient-to-br from-navy-800 to-navy-950 flex items-center justify-center min-h-[460px]">
                  {item.img ? (
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <p className="text-white/20 text-xs uppercase tracking-widest">Image coming soon</p>
                  )}
                </div>
              );
              const TextBlock = (
                <div className={`w-1/2 flex flex-col justify-center py-16 bg-white ${isEven ? 'pr-20 pl-14 items-end text-right' : 'pl-20 pr-14'}`}>
                  <p className="text-xs uppercase tracking-[0.2em] text-accent-500 font-semibold mb-3">{item.year}</p>
                  <h3 className="text-3xl font-bold text-navy-900 mb-4">{item.title}</h3>
                  <p className="text-silver-400 text-sm leading-relaxed max-w-xs">{item.desc}</p>
                </div>
              );
              return (
                <div key={item.year} className={`reveal reveal-delay-${i % 3} relative flex items-stretch rounded-2xl overflow-hidden shadow-sm`}>
                  {/* Center dot */}
                  <div className="absolute left-1/2 top-1/2 w-4 h-4 rounded-full bg-accent-500 border-2 border-white -translate-x-2 -translate-y-2 z-20" />
                  {isEven ? <>{TextBlock}{ImageBlock}</> : <>{ImageBlock}{TextBlock}</>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-gap bg-silver-100">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="text-center mb-16">
            <p className="reveal label-text text-navy-900/40 mb-4">Vision & Mission</p>
            <h2 className="reveal heading-md text-navy-900 max-w-2xl mx-auto">
              What drives everything we do.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="reveal card-light !p-10">
              <div className="w-14 h-14 rounded-full bg-accent-500/10 flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-accent-500" />
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-4">Our Vision</h3>
              <p className="body-md">
                To be a Christ-centered community that transforms lives,
                families, and neighborhoods through the power of the Gospel —
                reaching Hyderabad and beyond with the love of Jesus.
              </p>
            </div>

            <div className="reveal reveal-delay-1 card-light !p-10">
              <div className="w-14 h-14 rounded-full bg-accent-500/10 flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-accent-500" />
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-4">Our Mission</h3>
              <p className="body-md">
                To glorify God by making disciples who worship passionately,
                grow deeply in the Word, connect authentically in community,
                and serve selflessly in the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-gap bg-white">
        <div className="max-w-7xl mx-auto section-padding">
          <p className="reveal label-text text-navy-900/40 mb-4">Our Values</p>
          <h2 className="reveal heading-md text-navy-900 mb-16">
            What we stand for.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, title: 'Scripture', desc: 'The Bible is our foundation — the authoritative, inspired Word of God that guides every area of life.' },
              { icon: Heart, title: 'Worship', desc: 'We worship God wholeheartedly in spirit and truth, giving Him the glory He deserves in all things.' },
              { icon: Users, title: 'Community', desc: 'We believe in authentic relationships — doing life together, bearing burdens, and celebrating victories.' },
              { icon: Globe, title: 'Mission', desc: 'We are called to go — sharing the Gospel locally and globally, making disciples of all nations.' },
            ].map((val, i) => (
              <div key={val.title} className={`reveal reveal-delay-${i}`}>
                <div className="w-12 h-12 rounded-full bg-accent-500 flex items-center justify-center mb-6">
                  <val.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-3">{val.title}</h3>
                <p className="text-silver-400 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-gap bg-navy-950 noise-bg">
        <div className="max-w-7xl mx-auto section-padding">
          <p className="reveal label-text text-white/40 mb-4">Leadership</p>
          <h2 className="reveal heading-md text-white mb-16">
            Meet our team.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Pastor Name', role: 'Senior Pastor', initials: 'SP' },
              { name: 'Pastor Name', role: 'Associate Pastor', initials: 'AP' },
              { name: 'Leader Name', role: 'Worship Director', initials: 'WD' },
            ].map((leader, i) => (
              <div key={i} className={`reveal reveal-delay-${i} text-center`}>
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-navy-700 to-navy-900 mx-auto mb-6 border-2 border-white/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white/30 font-nav">{leader.initials}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{leader.name}</h3>
                <p className="text-white/40 text-sm">{leader.role}</p>
              </div>
            ))}
          </div>

          <p className="reveal text-center text-white/30 text-sm mt-12">
            Leadership details coming soon.
          </p>
        </div>
      </section>

      {/* Explore More */}
      <section className="section-gap bg-white">
        <div className="max-w-7xl mx-auto section-padding">
          <p className="reveal label-text text-navy-900/40 mb-4">Explore</p>
          <h2 className="reveal heading-md text-navy-900 mb-12">
            Learn more about us.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Vision & Mission', desc: 'Discover what drives everything we do and where we\'re heading.', href: '/about/vision' },
              { title: 'What to Expect', desc: 'Planning your first visit? Here\'s what you need to know.', href: '/about/expect' },
              { title: 'Leadership', desc: 'Meet the team God has placed to shepherd our church family.', href: '/about/leadership' },
            ].map((item, i) => (
              <Link key={item.href} href={item.href} className={`reveal reveal-delay-${i} group card-light !p-8 flex flex-col justify-between`}>
                <div>
                  <h3 className="text-lg font-bold text-navy-900 mb-3 group-hover:text-accent-500 transition-colors">{item.title}</h3>
                  <p className="text-silver-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-accent-500 text-sm font-medium uppercase tracking-wider">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-gap bg-silver-100">
        <div className="max-w-3xl mx-auto section-padding text-center">
          <h2 className="reveal heading-md text-navy-900 mb-6">
            Ready to connect?
          </h2>
          <p className="reveal reveal-delay-1 body-lg mb-10">
            We&apos;d love to hear from you. Whether you have questions or
            want to plan your first visit — reach out anytime.
          </p>
          <div className="reveal reveal-delay-2 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
