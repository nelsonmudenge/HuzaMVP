// app/layout.js
import { Sora, Space_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/lib/auth-context';
import Navbar from '@/components/layout/Navbar';
import './globals.css';

// Sora: modern, friendly display font perfect for student audience
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '600', '700', '800'],
});

// Space Mono: technical, trustworthy body font
const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '700'],
});

export const metadata = {
  title: 'HUZA — Student Icumbi Connect',
  description: 'Find verified off-campus housing near your university. Browse, compare, and reserve remotely with confidence.',
  keywords: 'student housing, university accommodation, off-campus housing, Rwanda, Kigali',
  openGraph: {
    title: 'HUZA — Student Icumbi Connect',
    description: 'Verified student housing platform',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} ${spaceMono.variable}`}>
      <body className="bg-gray-50 font-body antialiased">
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          {/* Global toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1a1a2e',
                color: '#fff',
                borderRadius: '12px',
                border: '1px solid rgba(0,123,255,0.3)',
              },
              success: { iconTheme: { primary: '#28A745', secondary: '#fff' } },
              error: { iconTheme: { primary: '#dc3545', secondary: '#fff' } },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
