import type { Metadata } from 'next';
import Conference2026Content from './Conference2026Content';

export const metadata: Metadata = {
  title: 'Christ-Centered: Pastors & Leaders Conference 2026 | Aenon Church',
  description:
    'Join us for the Christ-Centered Pastors & Leaders Conference 2026, November 12-15 at ANR Gardens, HMT Nagar, Secunderabad. Featuring Pastor William Cary and other speakers.',
};

export default function Conference2026Page() {
  return <Conference2026Content />;
}
