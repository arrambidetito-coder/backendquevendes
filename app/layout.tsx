import '@/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import { ToastContainer } from '@/components/ToastContainer';

function isValidClerkKey(key?: string) {
  return Boolean(key && (key.startsWith('pk_test_') || key.startsWith('pk_live_')) && !key.includes('placeholder') && key.length > 25);
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const content = (
    <>
      <Header />
      <ThemeToggle />
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      <Footer />
      <ToastContainer />
    </>
  );

  return (
    <html lang="es" className="dark">
      <head>
        <title>Que Vendes</title>
      </head>
      <body className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
        {isValidClerkKey(publishableKey) ? (
          <ClerkProvider publishableKey={publishableKey}>{content}</ClerkProvider>
        ) : (
          content
        )}
      </body>
    </html>
  );
}
