'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function PrivacyPolicyContent() {
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
          <p className="label-text text-white/40 mb-6">Legal</p>
          <h1 className="heading-xl text-white max-w-3xl">
            Privacy
            <br />
            Policy.
          </h1>
          <p className="text-xl text-white/50 max-w-xl mt-8">
            Last updated: 15 October 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-gap bg-white">
        <div className="max-w-3xl mx-auto section-padding">
          <div className="reveal">
            <p className="text-silver-400 leading-relaxed mb-6">
              This policy explains how{' '}
              <strong className="text-navy-900 font-semibold">
                Aenon Ministries &amp; Trust
              </strong>{' '}
              (&quot;the Trust&quot;, &quot;we&quot;, &quot;us&quot;), which
              runs Aenon Church and the website aenonchurch.com, collects and
              uses your personal information. We follow the Digital Personal
              Data Protection Act, 2023 and other applicable Indian law.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-4">
              What we collect
            </h2>
            <ul className="list-disc pl-5 space-y-3 text-silver-400 leading-relaxed mb-6">
              <li>
                <strong className="text-navy-900 font-semibold">
                  Information you give us:
                </strong>{' '}
                your name, email address, phone number, postal address and
                any message you send through our forms or by email.
              </li>
              <li>
                <strong className="text-navy-900 font-semibold">
                  Donation information:
                </strong>{' '}
                your name, contact details, the amount and date of your gift,
                and the transaction reference. Card, UPI and bank details are
                entered directly with our payment partner,{' '}
                <strong className="text-navy-900 font-semibold">PayU</strong>,
                and are never seen or stored by us.
              </li>
              <li>
                <strong className="text-navy-900 font-semibold">
                  Technical information:
                </strong>{' '}
                basic data such as your browser type, device and pages
                visited, collected through cookies or analytics tools to keep
                the site working and understand how it is used.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-4">
              How we use it
            </h2>
            <ul className="list-disc pl-5 space-y-3 text-silver-400 leading-relaxed mb-6">
              <li>To process donations, send receipts and answer donation queries.</li>
              <li>To reply to messages and prayer or contact requests.</li>
              <li>
                To send ministry updates, only if you have asked to receive
                them. You can unsubscribe at any time.
              </li>
              <li>To keep accounting records and meet our legal obligations.</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-4">
              Who we share it with
            </h2>
            <p className="text-silver-400 leading-relaxed mb-4">
              We do not sell or rent your personal information. We share it
              only with:
            </p>
            <ul className="list-disc pl-5 space-y-3 text-silver-400 leading-relaxed mb-6">
              <li>
                <strong className="text-navy-900 font-semibold">PayU</strong>,
                to process payments, under PayU&apos;s own privacy policy.
              </li>
              <li>
                Service providers that host our website or send our emails,
                who may use it only on our behalf.
              </li>
              <li>
                Government or law-enforcement authorities, where the law
                requires it.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-4">
              How long we keep it
            </h2>
            <p className="text-silver-400 leading-relaxed mb-6">
              Donation records are kept for as long as Indian accounting and
              tax laws require (normally at least 8 years). Other information
              is kept only as long as it is needed for the purpose it was
              collected for.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-4">
              Security
            </h2>
            <p className="text-silver-400 leading-relaxed mb-6">
              Our website uses HTTPS encryption. Payments are handled by PayU
              on its secure, PCI-DSS compliant platform. Access to donor
              records is limited to authorised trustees and staff.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-4">
              Your rights
            </h2>
            <p className="text-silver-400 leading-relaxed mb-6">
              You may ask us to see, correct or delete your personal
              information, or withdraw consent to updates, by writing to the
              contact below. Some donation records must be kept by law even
              if you ask for deletion.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-4">
              Cookies
            </h2>
            <p className="text-silver-400 leading-relaxed mb-6">
              You can block or delete cookies in your browser settings. Some
              parts of the site may not work properly without them.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-4">
              Children
            </h2>
            <p className="text-silver-400 leading-relaxed mb-6">
              Our website is not intended for children under 18 to make
              donations or submit personal information.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-4">
              Changes
            </h2>
            <p className="text-silver-400 leading-relaxed mb-6">
              We may update this policy from time to time. The date at the
              top shows when it last changed.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-4">
              Contact (Grievance Officer)
            </h2>
            <p className="text-silver-400 leading-relaxed">
              [PLACEHOLDER: name of trustee responsible]
              <br />
              Aenon Ministries &amp; Trust, Tarnaka, Secunderabad, Hyderabad,
              Telangana, India
              <br />
              Email:{' '}
              <a
                href="mailto:aenonchurch@gmail.com"
                className="text-accent-500 hover:text-accent-600 underline underline-offset-2"
              >
                aenonchurch@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-gap bg-silver-100">
        <div className="max-w-3xl mx-auto section-padding text-center">
          <h2 className="reveal heading-md text-navy-900 mb-6">
            Questions about your data?
          </h2>
          <p className="reveal reveal-delay-1 body-lg mb-10">
            Reach out to our team and we&apos;ll be glad to help.
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
