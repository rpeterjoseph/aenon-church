import type { Metadata } from 'next';
import RefundPolicyContent from './RefundPolicyContent';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Aenon Church',
  description:
    'How Aenon Ministries & Trust handles refunds and cancellations for donations made through aenonchurch.com.',
};

export default function RefundPolicyPage() {
  return <RefundPolicyContent />;
}
