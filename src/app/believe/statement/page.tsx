'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const beliefs = [
  {
    title: 'The Bible',
    text: 'We believe the Bible is the inspired, infallible, and authoritative Word of God. It is the supreme standard for faith, doctrine, and conduct in the life of every believer.',
  },
  {
    title: 'God',
    text: 'We believe in one God, eternally existing in three persons — Father, Son, and Holy Spirit. He is the Creator of all things, sovereign over all, and worthy of all worship and praise.',
  },
  {
    title: 'Jesus Christ',
    text: 'We believe in the deity of our Lord Jesus Christ, His virgin birth, His sinless life, His miracles, His atoning death on the cross, His bodily resurrection, His ascension, and His personal return in power and glory.',
  },
  {
    title: 'The Holy Spirit',
    text: 'We believe in the present ministry of the Holy Spirit, by whose indwelling the Christian is enabled to live a godly life. The Spirit empowers, guides, convicts, and gifts believers for ministry and service.',
  },
  {
    title: 'Salvation',
    text: 'We believe that salvation is a gift from God, received through repentance and faith in Jesus Christ alone. It is by grace alone, through faith alone, in Christ alone — not by works, but unto good works.',
  },
  {
    title: 'The Church',
    text: 'We believe the Church is the body of Christ — a community of believers called to worship God, grow in discipleship, fellowship with one another, and share the Gospel with the world.',
  },
  {
    title: 'Baptism & Communion',
    text: 'We practice water baptism by immersion as an outward declaration of an inward transformation. We observe the Lord\'s Supper as a remembrance of Christ\'s sacrifice and a proclamation of His return.',
  },
  {
    title: 'Eternity',
    text: 'We believe in the resurrection of both the saved and the lost — the saved unto eternal life with God and the lost unto eternal separation. Our hope is in the promised return of Jesus Christ.',
  },
];

export default function StatementOfFaithPage() {
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
          <Link href="/believe" className="inline-flex items-center gap-2 text-white/40 text-sm font-medium uppercase tracking-[0.15em] hover:text-white/60 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            What We Believe
          </Link>
          <p className="label-text text-white/40 mb-6">Statement of Faith</p>
          <h1 className="heading-xl text-white max-w-3xl">
            What we
            <br />
            hold true.
          </h1>
          <p className="text-xl text-white/50 max-w-xl mt-8">
            These are the core doctrines and convictions that define our
            faith and guide our church.
          </p>
        </div>
      </section>

      {/* Beliefs */}
      <section className="section-gap bg-white">
        <div className="max-w-4xl mx-auto section-padding">
          <p className="reveal label-text text-navy-900/40 mb-4">Our Doctrinal Beliefs</p>
          <h2 className="reveal heading-md text-navy-900 mb-16">
            Rooted in Scripture.
          </h2>

          <div className="space-y-0">
            {beliefs.map((belief, i) => (
              <div
                key={belief.title}
                className="reveal py-8 border-b border-silver-200 last:border-0"
              >
                <div className="flex items-start gap-6">
                  <span className="text-sm font-bold text-navy-900/20 min-w-[32px] pt-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-navy-900 mb-3">
                      {belief.title}
                    </h3>
                    <p className="text-silver-400 text-base leading-relaxed">
                      {belief.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-gap bg-silver-100">
        <div className="max-w-3xl mx-auto section-padding text-center">
          <h2 className="reveal heading-md text-navy-900 mb-6">
            Have questions about our beliefs?
          </h2>
          <p className="reveal reveal-delay-1 body-lg mb-10">
            Faith is a journey. If you have questions about what we believe
            or want to discuss any of these doctrines, our pastoral team
            would love to connect with you.
          </p>
          <div className="reveal reveal-delay-2 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Reach Out
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/believe" className="btn-outline">
              What We Believe
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
