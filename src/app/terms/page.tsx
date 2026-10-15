import type { Metadata } from 'next';
import TermsContent from './TermsContent';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Aenon Church',
  description:
    'Terms and conditions for using the Aenon Church website and making donations to Aenon Ministries & Trust.',
};

export default function TermsPage() {
  return <TermsContent />;
}
