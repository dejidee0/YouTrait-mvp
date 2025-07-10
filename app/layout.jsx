import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'YOUTRAIT - Express Your True Self',
  description: 'Discover yourself through traits, not images. Connect with your true identity on the trait-based social platform.',
  keywords: 'social media, personality, traits, identity, connection',
  authors: [{ name: 'YOUTRAIT Team' }],
  creator: 'YOUTRAIT',
  openGraph: {
    title: 'YOUTRAIT - Express Your True Self',
    description: 'Discover yourself through traits, not images. Connect with your true identity.',
    url: 'https://youtrait.com',
    siteName: 'YOUTRAIT',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'YOUTRAIT - Trait-based social platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YOUTRAIT - Express Your True Self',
    description: 'Discover yourself through traits, not images.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}