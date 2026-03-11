'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, BookOpen, Heart, Cross, Sunrise } from 'lucide-react';

export default function GospelPage() {
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
          <p className="label-text text-white/40 mb-6">The Gospel</p>
          <h1 className="heading-xl text-white max-w-3xl">
            What is
            <br />
            the Gospel?
          </h1>
          <p className="text-xl text-white/50 max-w-xl mt-8">
            The most important message the world has ever heard —
            and it changes everything.
          </p>
        </div>
      </section>

      {/* The Good News */}
      <section className="section-gap bg-white">
        <div className="max-w-3xl mx-auto section-padding">
          <div className="reveal w-16 h-16 rounded-full bg-accent-500/10 flex items-center justify-center mx-auto mb-8">
            <BookOpen className="w-7 h-7 text-accent-500" />
          </div>
          <h2 className="reveal heading-md text-navy-900 text-center mb-8">
            The Good News
          </h2>
          <p className="reveal reveal-delay-1 body-lg text-center mb-6">
            The word &ldquo;Gospel&rdquo; literally means &ldquo;good news.&rdquo;
            It is the message that God loves the world and sent His only Son,
            Jesus Christ, to save us. Through His death on the cross and His
            resurrection from the grave, we are offered forgiveness, new life,
            and an eternal relationship with God.
          </p>
          <p className="reveal reveal-delay-2 body-md text-center">
            This isn&apos;t just a belief we hold — it&apos;s the reality that
            transforms everything we do, how we live, and how we love one
            another.
          </p>
        </div>
      </section>

      {/* Four Parts of the Gospel */}
      <section className="section-gap bg-silver-100">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="text-center mb-16">
            <p className="reveal label-text text-navy-900/40 mb-4">Understanding the Gospel</p>
            <h2 className="reveal heading-md text-navy-900">
              The story God is telling.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                step: '01',
                title: 'God Created Us',
                desc: 'God created humanity in His image, to know Him, enjoy Him, and live in perfect relationship with Him. We were made for a purpose — to glorify God and experience His love.',
                icon: Sunrise,
              },
              {
                step: '02',
                title: 'Sin Separated Us',
                desc: 'Through our rebellion and disobedience, sin entered the world. Every person has sinned and fallen short of God\'s glory. Sin broke our relationship with God and brought death into the world.',
                icon: Heart,
              },
              {
                step: '03',
                title: 'Jesus Rescued Us',
                desc: 'God, in His great love, sent His Son Jesus Christ to live a perfect life, die on the cross for our sins, and rise again on the third day. Jesus paid the price we could never pay.',
                icon: Cross,
              },
              {
                step: '04',
                title: 'We Must Respond',
                desc: 'The Gospel calls for a response. God invites every person to repent of their sin and place their faith in Jesus Christ alone for salvation. When we do, we receive forgiveness and new life.',
                icon: BookOpen,
              },
            ].map((item, i) => (
              <div key={item.step} className={`reveal reveal-delay-${Math.min(i, 2)} card-light !p-10`}>
                <span className="text-sm font-bold text-accent-500/40 mb-4 block">{item.step}</span>
                <item.icon className="w-8 h-8 text-accent-500 mb-4" />
                <h3 className="text-xl font-bold text-navy-900 mb-4">{item.title}</h3>
                <p className="text-silver-400 text-base leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Verse */}
      <section className="py-24 bg-navy-950 noise-bg">
        <div className="max-w-3xl mx-auto section-padding text-center">
          <blockquote className="reveal text-2xl md:text-3xl text-white/80 leading-relaxed italic">
            &ldquo;For God so loved the world, that He gave His only Son,
            that whoever believes in Him should not perish but have eternal life.&rdquo;
          </blockquote>
          <p className="reveal reveal-delay-1 text-white/30 text-sm mt-8 uppercase tracking-wider font-medium">John 3:16</p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-gap bg-white">
        <div className="max-w-3xl mx-auto section-padding text-center">
          <h2 className="reveal heading-md text-navy-900 mb-6">
            Want to know more?
          </h2>
          <p className="reveal reveal-delay-1 body-lg mb-10">
            Faith begins with hearing the good news. If you&apos;d like to learn
            more about Jesus or have questions about the Gospel, we&apos;d love
            to talk with you.
          </p>
          <div className="reveal reveal-delay-2 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Talk to Someone
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
