import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MaintenanceCountdown from '@/components/MaintenanceCountdown';

export const metadata: Metadata = {
  title: 'Aenon Church | Welcome Home',
  description:
    'Aenon Church in Tarnaka, Hyderabad — a Christ-centered community committed to glorifying God through worship, discipleship, and fellowship. Join us Sundays at 8AM, 11AM & 7PM.',
  keywords: [
    'Aenon Church',
    'church in Hyderabad',
    'church in Tarnaka',
    'Christian church Hyderabad',
    'Sunday service Hyderabad',
    'Bible study Hyderabad',
    'youth church Hyderabad',
  ],
  openGraph: {
    title: 'Aenon Church | Welcome Home',
    description:
      'A Christ-centered community in Tarnaka, Hyderabad. Join us Sundays at 8AM, 11AM & 7PM.',
    url: 'https://aenonchurch.com',
    siteName: 'Aenon Church',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aenon Church | Welcome Home',
    description:
      'A Christ-centered community in Tarnaka, Hyderabad. Join us Sundays at 8AM, 11AM & 7PM.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  metadataBase: new URL('https://aenonchurch.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MaintenanceCountdown />
      </body>
    </html>
  );
}
