'use client';

import { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Youtube, Facebook, Instagram } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-navy-950 noise-bg">
        <div className="max-w-7xl mx-auto section-padding">
          <p className="label-text text-white/40 mb-6">Contact</p>
          <h1 className="heading-xl text-white max-w-3xl">
            Let&apos;s
            <br />
            connect.
          </h1>
          <p className="text-xl text-white/50 max-w-xl mt-8">
            Have a question, prayer request, or want to plan your visit?
            We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="section-gap bg-white">
        <div className="max-w-7xl mx-auto section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Form */}
            <div>
              <p className="reveal label-text text-navy-900/40 mb-4">Send A Message</p>
              <h2 className="reveal heading-sm text-navy-900 mb-8">
                We&apos;d love to hear from you.
              </h2>

              {submitted ? (
                <div className="reveal card-light !p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                    <Send className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy-900 mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-silver-400">
                    Thank you for reaching out. We&apos;ll get back to you
                    as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="reveal reveal-delay-1 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-navy-900 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-silver-200 bg-white text-navy-900 placeholder:text-silver-300 focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-900 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-silver-200 bg-white text-navy-900 placeholder:text-silver-300 focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-900 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-silver-200 bg-white text-navy-900 placeholder:text-silver-300 focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-900 mb-2">
                      I&apos;m Reaching Out About
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-silver-200 bg-white text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-all"
                    >
                      <option value="">Select a topic</option>
                      <option value="visit">Planning a Visit</option>
                      <option value="prayer">Prayer Request</option>
                      <option value="volunteer">Volunteering</option>
                      <option value="ministries">Joining a Ministry</option>
                      <option value="general">General Question</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-900 mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-silver-200 bg-white text-navy-900 placeholder:text-silver-300 focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-all resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button type="submit" className="btn-primary">
                    Send Message
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <p className="reveal label-text text-navy-900/40 mb-4">Contact Info</p>
              <h2 className="reveal heading-sm text-navy-900 mb-8">
                Other ways to reach us.
              </h2>

              <div className="reveal reveal-delay-1 space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900 mb-1">Address</h3>
                    <p className="text-silver-400 text-sm leading-relaxed">
                      Tarnaka, Secunderabad,<br />
                      Hyderabad, Telangana, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent-500/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-accent-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900 mb-1">Phone</h3>
                    <a href="tel:+919849613247" className="text-silver-400 hover:text-navy-900 text-sm transition-colors">
                      +91 98496 13247
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent-500/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900 mb-1">Email</h3>
                    <a href="mailto:aenonchurch@gmail.com" className="text-silver-400 hover:text-navy-900 text-sm transition-colors">
                      aenonchurch@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent-500/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-accent-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900 mb-1">Service Times</h3>
                    <div className="text-silver-400 text-sm space-y-1">
                      <p>Sunday: 8AM, 11AM & 7PM</p>
                      <p>Wednesday: 7PM (Bible Study)</p>
                      <p>Friday: 7PM (Prayer Meeting)</p>
                      <p>Saturday: 6PM (Youth)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="reveal mt-12 pt-8 border-t border-silver-200">
                <p className="text-sm font-medium text-navy-900 mb-4">Follow Us</p>
                <div className="flex items-center gap-3">
                  {[
                    { icon: Youtube, href: 'https://www.youtube.com/aenonchurch', label: 'YouTube' },
                    { icon: Facebook, href: '#', label: 'Facebook' },
                    { icon: Instagram, href: '#', label: 'Instagram' },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-silver-200 flex items-center justify-center text-silver-400 hover:text-accent-500 hover:border-accent-500 transition-all"
                      aria-label={s.label}
                    >
                      <s.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="reveal mt-10 rounded-2xl overflow-hidden aspect-[4/3]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2!2d78.5412!3d17.4326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sTarnaka%2C%20Secunderabad%2C%20Hyderabad!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Aenon Church Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
