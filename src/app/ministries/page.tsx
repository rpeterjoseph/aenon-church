'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Heart, BookOpen, Music } from 'lucide-react';

const ministries = [
  {
    title: "Men's Ministry",
    desc: "Building men of faith through accountability, discipleship, and brotherhood. We meet regularly for Bible study, prayer, and fellowship — equipping men to lead with integrity in their families, workplaces, and communities.",
    schedule: 'Meets monthly',
    icon: Users,
    gradient: 'from-navy-800 to-navy-950',
    href: '/ministries/mens',
  },
  {
    title: "Women's Ministry",
    desc: "Empowering women to grow in faith, friendship, and spiritual depth. Through Bible studies, retreats, and community gatherings, we create a space where women can be vulnerable, supported, and strengthened in Christ.",
    schedule: 'Meets monthly',
    icon: Heart,
    gradient: 'from-navy-700 to-navy-900',
    href: '/ministries/womens',
  },
  {
    title: 'Young Adults',
    desc: "A vibrant community for young adults navigating faith, career, and purpose. We gather for worship, deep conversations, and fun — discovering what it means to follow Jesus in every season of life.",
    schedule: 'Saturdays at 6:00 PM',
    icon: Music,
    gradient: 'from-navy-600 to-navy-800',
    href: '/ministries/youth',
  },
  {
    title: "Children's Ministry",
    desc: "A safe, fun, and engaging environment where kids learn about Jesus through age-appropriate teaching, worship, and activities. We partner with parents to build strong spiritual foundations in the next generation.",
    schedule: 'Every Sunday',
    icon: BookOpen,
    gradient: 'from-navy-700 to-navy-950',
    href: '/ministries/kids',
  },
];

export default function MinistriesPage() {
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
      <section className="relative pt-40 pb-24 bg-navy-950 noise-bg">
        <div className="max-w-7xl mx-auto section-padding">
          <p className="label-text text-white/40 mb-6">Ministries</p>
          <h1 className="heading-xl text-white max-w-3xl">
            Find your
            <br />
            place.
          </h1>
          <p className="text-xl text-white/50 max-w-xl mt-8">
            Whatever your age or stage, there&apos;s a community for you at
            Aenon Church. Get connected and grow together.
          </p>
        </div>
      </section>

      {/* Ministry Cards - Alternating Layout */}
      <section className="section-gap bg-white">
        <div className="max-w-7xl mx-auto section-padding space-y-24">
          {ministries.map((ministry, i) => (
            <div
              key={ministry.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                i % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={`reveal ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${ministry.gradient} noise-bg relative overflow-hidden flex items-center justify-center`}>
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/[0.03] rounded-full -translate-y-1/3 translate-x-1/3" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/[0.02] rounded-full translate-y-1/3 -translate-x-1/3" />
                  <div className="relative z-10">
                    <ministry.icon className="w-16 h-16 text-white/15" />
                  </div>
                </div>
              </div>
              <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="reveal w-12 h-12 rounded-full bg-navy-900/5 flex items-center justify-center mb-6">
                  <ministry.icon className="w-5 h-5 text-navy-900" />
                </div>
                <h2 className="reveal heading-sm text-navy-900 mb-4">{ministry.title}</h2>
                <p className="reveal reveal-delay-1 body-md mb-4">{ministry.desc}</p>
                <p className="reveal reveal-delay-2 text-sm font-medium text-navy-900/60 mb-8">
                  {ministry.schedule}
                </p>
                <div className="reveal reveal-delay-3">
                  <Link href={ministry.href} className="btn-outline !py-3 !px-6 !text-xs">
                    Learn More
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Ministries */}
      <section className="section-gap bg-silver-100">
        <div className="max-w-7xl mx-auto section-padding">
          <p className="reveal label-text text-navy-900/40 mb-4">Explore</p>
          <h2 className="reveal heading-sm text-navy-900 mb-12">
            Discover each ministry.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ministries.map((ministry, i) => (
              <Link
                key={ministry.title}
                href={ministry.href}
                className={`reveal reveal-delay-${Math.min(i, 3)} group card-light !p-0 overflow-hidden`}
              >
                <div className={`aspect-[16/9] bg-gradient-to-br ${ministry.gradient} flex items-center justify-center`}>
                  <ministry.icon className="w-10 h-10 text-white/15" />
                </div>
                <div className="p-6">
                  <h3 className="text-base font-bold text-navy-900 mb-1 group-hover:text-accent-500 transition-colors">
                    {ministry.title}
                  </h3>
                  <p className="text-sm text-silver-400">{ministry.schedule}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-950 noise-bg py-24">
        <div className="max-w-3xl mx-auto section-padding text-center">
          <h2 className="reveal heading-md text-white mb-6">
            Want to serve?
          </h2>
          <p className="reveal reveal-delay-1 text-white/50 text-lg mb-10">
            We believe everyone has gifts to share. Join a ministry team and
            make an impact in the lives of others.
          </p>
          <div className="reveal reveal-delay-2">
            <Link href="/contact" className="btn-white">
              Volunteer Today
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
