'use client';

import { useEffect } from 'react';
import { Heart, Shield, Gift, ArrowUpRight } from 'lucide-react';

export default function GivePage() {
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
          <p className="label-text text-white/40 mb-6">Give</p>
          <h1 className="heading-xl text-white max-w-3xl">
            Generosity
            <br />
            changes lives.
          </h1>
          <p className="text-xl text-white/50 max-w-xl mt-8">
            Your generosity fuels the mission of the church — reaching
            the lost, serving the community, and building the Kingdom.
          </p>
        </div>
      </section>

      {/* Why Give */}
      <section className="section-gap bg-white">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="reveal label-text text-navy-900/40 mb-4">Why Give?</p>
              <h2 className="reveal heading-md text-navy-900 mb-8">
                Every gift makes
                <br />
                an eternal impact.
              </h2>
              <p className="reveal reveal-delay-1 body-lg mb-6">
                Giving is an act of worship. When you give to Aenon Church,
                you are investing in lives being transformed, families being
                restored, and communities being served in the name of Jesus.
              </p>
              <p className="reveal reveal-delay-2 body-md">
                &ldquo;Each of you should give what you have decided in your
                heart to give, not reluctantly or under compulsion, for God
                loves a cheerful giver.&rdquo; — 2 Corinthians 9:7
              </p>
            </div>

            <div className="reveal reveal-delay-1 space-y-6">
              {[
                { icon: Heart, title: 'Worship & Ministry', desc: 'Supporting weekly services, music, teaching, and pastoral care.' },
                { icon: Gift, title: 'Community Outreach', desc: 'Feeding the hungry, helping the needy, and serving our neighbors.' },
                { icon: Shield, title: 'Next Generation', desc: 'Investing in youth, children, and young adult programs.' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-5 rounded-xl bg-silver-100">
                  <div className="w-10 h-10 rounded-full bg-navy-900/5 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-navy-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900 mb-1">{item.title}</h3>
                    <p className="text-silver-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Give Options */}
      <section className="section-gap bg-silver-100">
        <div className="max-w-4xl mx-auto section-padding text-center">
          <p className="reveal label-text text-navy-900/40 mb-4">Give Online</p>
          <h2 className="reveal heading-md text-navy-900 mb-6">
            Simple, secure giving.
          </h2>
          <p className="reveal reveal-delay-1 body-lg max-w-xl mx-auto mb-12">
            Give online quickly and securely. We support UPI, debit cards,
            credit cards, and net banking.
          </p>

          {/* Placeholder Give Button */}
          <div className="reveal reveal-delay-2 max-w-md mx-auto">
            <div className="card-light !p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-navy-900 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-4">
                Give Now
              </h3>
              <p className="text-silver-400 text-sm mb-8">
                Online giving portal coming soon. For now, you can give
                during our Sunday services or contact us for bank details.
              </p>
              <button className="btn-primary w-full justify-center" disabled>
                Give Online
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <p className="text-xs text-silver-300 mt-4">
                Powered by Razorpay / PayU (coming soon)
              </p>
            </div>
          </div>

          {/* Alternative */}
          <div className="reveal mt-12">
            <p className="text-silver-400 text-sm">
              You can also give in person during any of our Sunday services,
              <br className="hidden md:block" />
              or contact us at{' '}
              <a href="mailto:aenonchurch@gmail.com" className="text-navy-900 font-medium underline underline-offset-2">
                aenonchurch@gmail.com
              </a>{' '}
              for bank transfer details.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
