'use client';

import { useState } from 'react';
import { Send, Heart } from 'lucide-react';

export default function PrayerRequestPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-navy-950 noise-bg">
        <div className="max-w-7xl mx-auto section-padding">
          <p className="label-text text-white/40 mb-6">Prayer</p>
          <h1 className="heading-xl text-white max-w-3xl">
            We&apos;re believing
            <br />
            with you.
          </h1>
          <p className="text-xl text-white/50 max-w-xl mt-8">
            Share your prayer request and our team will pray with you. Your request is kept in confidence.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="section-gap bg-white">
        <div className="max-w-4xl mx-auto section-padding">
          <p className="label-text text-navy-900/40 mb-4">Submit a Request</p>
          <h2 className="heading-sm text-navy-900 mb-8">Share your heart.</h2>

          {submitted ? (
            <div className="card-light !p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-3">We&apos;re Praying</h3>
              <p className="text-silver-400">
                Your request has been received. Our prayer team will be lifting you up before the Lord.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-2">First Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-silver-200 bg-white text-navy-900 placeholder:text-silver-300 focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-2">Last Name <span className="text-silver-300 font-normal">(optional)</span></label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-silver-200 bg-white text-navy-900 placeholder:text-silver-300 focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">Email Address <span className="text-silver-300 font-normal">(optional)</span></label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-silver-200 bg-white text-navy-900 placeholder:text-silver-300 focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">Prayer Request</label>
                <textarea
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-silver-200 bg-white text-navy-900 placeholder:text-silver-300 focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-all resize-none"
                  placeholder="Share what you&apos;d like us to pray for..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-900 mb-3">Privacy</label>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="private"
                    className="mt-1 w-4 h-4 rounded border-silver-200 text-navy-900 focus:ring-navy-900/20"
                  />
                  <label htmlFor="private" className="text-sm text-silver-400 leading-relaxed">
                    Keep my request private — share only with the pastoral team, not the wider prayer group.
                  </label>
                </div>
              </div>

              <button type="submit" className="btn-primary">
                Submit Prayer Request
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
