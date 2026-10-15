import type { Metadata } from 'next';
import PrivacyPolicyContent from './PrivacyPolicyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy | Aenon Church',
  description:
    'How Aenon Ministries & Trust collects, uses and protects your personal information on aenonchurch.com.',
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
