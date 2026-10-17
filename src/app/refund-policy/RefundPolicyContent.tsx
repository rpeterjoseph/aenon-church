'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function RefundPolicyContent() {
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
            Refund &amp;
            <br />
            Cancellation Policy.
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
              Aenon Ministries &amp; Trust receives only voluntary donations
              through this website. We do not sell goods or services, so
              nothing is shipped or delivered.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-4">
              Donations are non-refundable
            </h2>
            <p className="text-silver-400 leading-relaxed mb-6">
              A donation is a voluntary gift. Once made, it is normally{' '}
              <strong className="text-navy-900 font-semibold">
                not refundable or cancellable
              </strong>
              .
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-4">
              When we will refund
            </h2>
            <p className="text-silver-400 leading-relaxed mb-4">
              We will refund a payment if:
            </p>
            <ul className="list-disc pl-5 space-y-3 text-silver-400 leading-relaxed mb-6">
              <li>
                you were charged{' '}
                <strong className="text-navy-900 font-semibold">
                  more than once
                </strong>{' '}
                for the same donation (a duplicate payment);
              </li>
              <li>
                you entered a{' '}
                <strong className="text-navy-900 font-semibold">
                  wrong amount
                </strong>{' '}
                by mistake; or
              </li>
              <li>
                the payment was{' '}
                <strong className="text-navy-900 font-semibold">
                  made without your authorisation
                </strong>
                .
              </li>
            </ul>
            <p className="text-silver-400 leading-relaxed mb-6">
              To ask for a refund, email{' '}
              <a
                href="mailto:aenonchurch@gmail.com"
                className="text-accent-500 hover:text-accent-600 underline underline-offset-2"
              >
                aenonchurch@gmail.com
              </a>{' '}
              or call{' '}
              <a
                href="tel:+919849613247"
                className="text-accent-500 hover:text-accent-600 underline underline-offset-2"
              >
                +91 98496 13247
              </a>{' '}
              <strong className="text-navy-900 font-semibold">
                within 7 days
              </strong>{' '}
              of the payment. Please give your name, the date and amount, and
              the PayU transaction ID.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-4">
              How refunds are paid
            </h2>
            <p className="text-silver-400 leading-relaxed mb-6">
              Approved refunds are made only to the{' '}
              <strong className="text-navy-900 font-semibold">
                original payment method
              </strong>{' '}
              (the same card, UPI ID, net-banking account or wallet), never in
              cash or to another account. We process approved refunds within 7
              working days of approval. Your bank or card issuer may then take
              a further 5 to 7 working days to show the amount in your
              account.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-4">
              Failed transactions
            </h2>
            <p className="text-silver-400 leading-relaxed mb-6">
              If money left your account but the payment failed, it is
              usually reversed automatically by your bank or PayU within 5 to
              7 working days. If it is not, contact us with the transaction
              details and we will help.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-4">
              Recurring donations
            </h2>
            <p className="text-silver-400 leading-relaxed mb-6">
              If you have set up a recurring donation, you can cancel future
              payments at any time by contacting us at least 3 working days
              before the next payment date. Payments already made are
              covered by this policy.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-4">
              Contact
            </h2>
            <p className="text-silver-400 leading-relaxed">
              Aenon Ministries &amp; Trust, 12-13-829/87, Near Vijaya Dairy,
              Tarnaka, Secunderabad, Hyderabad, Telangana 500017, India
              <br />
              Email:{' '}
              <a
                href="mailto:aenonchurch@gmail.com"
                className="text-accent-500 hover:text-accent-600 underline underline-offset-2"
              >
                aenonchurch@gmail.com
              </a>{' '}
              &middot; Phone:{' '}
              <a
                href="tel:+919849613247"
                className="text-accent-500 hover:text-accent-600 underline underline-offset-2"
              >
                +91 98496 13247
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-gap bg-silver-100">
        <div className="max-w-3xl mx-auto section-padding text-center">
          <h2 className="reveal heading-md text-navy-900 mb-6">
            Need help with a donation?
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
