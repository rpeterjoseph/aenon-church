'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function TermsContent() {
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
            Terms &amp;
            <br />
            Conditions.
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
              These terms apply to your use of aenonchurch.com (the
              &quot;Website&quot;), run by{' '}
              <strong className="text-navy-900 font-semibold">
                Aenon Ministries &amp; Trust
              </strong>{' '}
              (the &quot;Trust&quot;, &quot;we&quot;, &quot;us&quot;), a public
              charitable trust registered in Hyderabad, Telangana, India (Reg.
              No. 25/BIV/99). By using the Website or making a donation, you
              agree to these terms.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-4">
              1. About the Trust
            </h2>
            <p className="text-silver-400 leading-relaxed mb-6">
              The Trust is a non-profit Christian organisation carrying out
              religious, social and educational work. The Website gives
              information about our ministry and lets supporters donate
              online.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-4">
              2. Donations
            </h2>
            <ul className="list-disc pl-5 space-y-3 text-silver-400 leading-relaxed mb-6">
              <li>
                All donations are voluntary gifts to the Trust. You receive no
                goods, services or other benefit in return.
              </li>
              <li>
                Donations are accepted{' '}
                <strong className="text-navy-900 font-semibold">
                  only from residents of India
                </strong>
                , in{' '}
                <strong className="text-navy-900 font-semibold">
                  Indian Rupees (INR)
                </strong>
                , from Indian bank accounts, cards or UPI. The Trust does not
                currently accept foreign contributions. By donating, you
                confirm you are an Indian resident and that the money is your
                own.
              </li>
              <li>
                The Trust does{' '}
                <strong className="text-navy-900 font-semibold">not</strong>{' '}
                currently hold registration under Section 12A or 80G of the
                Income-tax Act.{' '}
                <strong className="text-navy-900 font-semibold">
                  Donations are not eligible for any income-tax deduction or
                  exemption.
                </strong>
              </li>
              <li>
                Donations are used for the Trust&apos;s charitable purposes.
                Where you give for a specific programme, we use it for that
                programme where possible; if that programme is fully funded or
                no longer running, we may use it for our general charitable
                work.
              </li>
              <li>
                A donation acknowledgement is emailed to the address you
                provide.
              </li>
              <li>
                Refunds are covered by our{' '}
                <Link
                  href="/refund-policy"
                  className="text-accent-500 hover:text-accent-600 underline underline-offset-2"
                >
                  Refund &amp; Cancellation Policy
                </Link>
                .
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-4">
              3. Payments
            </h2>
            <p className="text-silver-400 leading-relaxed mb-6">
              Online payments are processed by{' '}
              <strong className="text-navy-900 font-semibold">PayU</strong>, a
              third-party payment gateway. We do not see or store your card,
              UPI or bank details. Your use of PayU is also subject to
              PayU&apos;s own terms. We are not responsible for delays or
              failures caused by banks or the payment gateway.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-4">
              4. Use of the Website
            </h2>
            <p className="text-silver-400 leading-relaxed mb-6">
              You agree not to misuse the Website, including by attempting
              unauthorised access, uploading harmful code, or using it for
              any unlawful purpose or to make fraudulent payments.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-4">
              5. Content
            </h2>
            <p className="text-silver-400 leading-relaxed mb-6">
              Text, images, logos, sermons and other content on the Website
              belong to the Trust or are used with permission. You may share
              it for personal, non-commercial use with credit to Aenon
              Church. Any other use needs our written permission.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-4">
              6. Links to other sites
            </h2>
            <p className="text-silver-400 leading-relaxed mb-6">
              The Website may link to other sites, such as social media. We
              are not responsible for their content or practices.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-4">
              7. Limitation of liability
            </h2>
            <p className="text-silver-400 leading-relaxed mb-6">
              The Website is provided &quot;as is&quot;. To the extent allowed
              by law, the Trust is not liable for any indirect loss arising
              from the use of the Website.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-4">
              8. Privacy
            </h2>
            <p className="text-silver-400 leading-relaxed mb-6">
              Our{' '}
              <Link
                href="/privacy-policy"
                className="text-accent-500 hover:text-accent-600 underline underline-offset-2"
              >
                Privacy Policy
              </Link>{' '}
              explains how we handle your information.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-4">
              9. Changes
            </h2>
            <p className="text-silver-400 leading-relaxed mb-6">
              We may update these terms at any time. The date at the top shows
              the latest version.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-4">
              10. Governing law
            </h2>
            <p className="text-silver-400 leading-relaxed mb-6">
              These terms are governed by the laws of India. Any dispute is
              subject to the courts at Hyderabad, Telangana.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-12 mb-4">
              11. Contact
            </h2>
            <p className="text-silver-400 leading-relaxed">
              Aenon Ministries &amp; Trust, Tarnaka, Secunderabad, Hyderabad,
              Telangana, India
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
            Questions about these terms?
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
