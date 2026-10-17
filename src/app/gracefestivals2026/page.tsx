import type { Metadata } from 'next';
import GraceFestivals2026Content from './GraceFestivals2026Content';

export const metadata: Metadata = {
  title: 'Grace Festivals 2026 | Aenon Church',
  description:
    'Grace Festivals 2026 — November 12-15 at ANR Gardens, HMT Nagar, Secunderabad, Telangana, 6PM nightly. A yearly event from Aenon Church, in partnership with Aenon Ministries and Trust, bringing people from every background together to hear the Gospel.',
};

export default function GraceFestivals2026Page() {
  return <GraceFestivals2026Content />;
}
