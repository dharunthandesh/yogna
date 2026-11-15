import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import CartToast from '@/components/CartToast';

export const metadata: Metadata = {
  title: 'YOGNA — Corporate Hygiene Solutions',
  description: 'India\'s premier corporate hygiene solutions provider. Comprehensive, eco-friendly hygiene, sanitization, and specialized cleaning systems for commercial, industrial, and institutional establishments.',
  keywords: ['corporate hygiene', 'hygiene solutions', 'industrial cleaning', 'commercial hygiene', 'sanitization', 'YOGNA'],
  openGraph: {
    title: 'YOGNA — Corporate Hygiene Solutions',
    description: 'Comprehensive, eco-friendly hygiene and sanitization systems for commercial and industrial establishments.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <CustomCursor />
          <Navbar />
          <CartDrawer />
          <CartToast />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
