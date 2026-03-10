'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

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

export default function BelievePage() {
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
          <p className="label-text text-white/40 mb-6">What We Believe</p>
          <h1 className="heading-xl text-white max-w-4xl">
            Built on the
            <br />
            Rock.
          </h1>
          <p className="text-xl text-white/50 max-w-xl mt-8">
            Our faith is rooted in Scripture and centered on the Gospel
            of Jesus Christ. Here is what we believe.
          </p>
        </div>
      </section>

      {/* The Gospel */}
      <section className="section-gap bg-white">
        <div className="max-w-3xl mx-auto section-padding text-center">
          <div className="reveal w-16 h-16 rounded-full bg-navy-900/5 flex items-center justify-center mx-auto mb-8">
            <BookOpen className="w-7 h-7 text-navy-900" />
          </div>
          <h2 className="reveal heading-md text-navy-900 mb-8">
            The Gospel
          </h2>
          <p className="reveal reveal-delay-1 body-lg mb-6">
            The Gospel — the &ldquo;good news&rdquo; — is the message that God
            loves the world and sent His only Son, Jesus Christ, to save us.
            Through His death and resurrection, we are offered forgiveness,
            new life, and an eternal relationship with God.
          </p>
          <p className="reveal reveal-delay-2 body-md">
            This isn&apos;t just a belief we hold — it&apos;s the reality that
            transforms everything we do, how we live, and how we love one
            another.
          </p>
        </div>
      </section>

      {/* Statement of Faith */}
      <section className="section-gap bg-silver-100">
        <div className="max-w-4xl mx-auto section-padding">
          <p className="reveal label-text text-navy-900/40 mb-4">Statement of Faith</p>
          <h2 className="reveal heading-md text-navy-900 mb-16">
            What we hold true.
          </h2>

          <div className="space-y-0">
            {beliefs.map((belief, i) => (
              <div
                key={belief.title}
                className={`reveal py-8 border-b border-silver-200 last:border-0`}
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
      <section className="section-gap bg-white">
        <div className="max-w-3xl mx-auto section-padding text-center">
          <h2 className="reveal heading-md text-navy-900 mb-6">
            Have questions?
          </h2>
          <p className="reveal reveal-delay-1 body-lg mb-10">
            Faith is a journey, and we&apos;re here to walk with you.
            If you have questions about what we believe or about your own
            faith, we&apos;d love to talk.
          </p>
          <div className="reveal reveal-delay-2">
            <Link href="/contact" className="btn-primary">
              Reach Out
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
