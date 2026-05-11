'use client';

import { useState } from 'react';
import { Send, Heart, Users, Music, BookOpen, Baby, Wrench } from 'lucide-react';

const areas = [
  { icon: Music, label: 'Worship & Music' },
  { icon: Users, label: 'Hospitality & Ushering' },
  { icon: BookOpen, label: 'Bible Study & Teaching' },
  { icon: Baby, label: 'Children\'s Ministry' },
  { icon: Heart, label: 'Pastoral Care' },
  { icon: Wrench, label: 'Technical & Media' },
];

export default function VolunteerPage() {
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
          <p className="label-text text-white/40 mb-6">Serve With Us</p>
          <h1 className="heading-xl text-white max-w-3xl">
            Use your gifts
            <br />
            for God&apos;s glory.
          </h1>
          <p className="text-xl text-white/50 max-w-xl mt-8">
            There&apos;s a place for you to serve at Aenon Church. Tell us about yourself and we&apos;ll connect you with the right ministry team.
          </p>
        </div>
      </section>

      {/* Volunteer Areas */}
      <section className="pt-24 pb-0 bg-white">
        <div className="max-w-4xl mx-auto section-padding">
          <p className="label-text text-navy-900/40 mb-4">Ministry Teams</p>
          <h2 className="heading-sm text-navy-900 mb-10">Ways to serve.</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-0">
            {areas.map((area) => (
              <div key={area.label} className="flex items-center gap-3 p-4 rounded-xl border border-silver-200 bg-silver-50">
                <div className="w-9 h-9 rounded-full bg-accent-500/10 flex items-center justify-center flex-shrink-0">
                  <area.icon className="w-4 h-4 text-accent-500" />
                </div>
                <span className="text-sm font-medium text-navy-900">{area.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section-gap bg-white">
        <div className="max-w-4xl mx-auto section-padding">
          <p className="label-text text-navy-900/40 mb-4">Sign Up</p>
          <h2 className="heading-sm text-navy-900 mb-8">Get involved.</h2>

          {submitted ? (
            <div className="card-light !p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-3">Thank You!</h3>
              <p className="text-silver-400">
                We&apos;ve received your interest in volunteering. A member of our team will be in touch with you soon.
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
                  <label className="block text-sm font-medium text-navy-900 mb-2">Last Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-silver-200 bg-white text-navy-900 placeholder:text-silver-300 focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-silver-200 bg-white text-navy-900 placeholder:text-silver-300 focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-xl border border-silver-200 bg-white text-navy-900 placeholder:text-silver-300 focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-all"
                  placeholder="+91 98000 00000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">Area of Interest</label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-xl border border-silver-200 bg-white text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-all"
                >
                  <option value="">Select a ministry team</option>
                  {areas.map((a) => (
                    <option key={a.label} value={a.label}>{a.label}</option>
                  ))}
                  <option value="other">Open to Wherever I&apos;m Needed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">Tell Us About Yourself</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-silver-200 bg-white text-navy-900 placeholder:text-silver-300 focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-all resize-none"
                  placeholder="Share any skills, experience, or availability that might help us place you well."
                />
              </div>

              <button type="submit" className="btn-primary">
                Submit Interest
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
