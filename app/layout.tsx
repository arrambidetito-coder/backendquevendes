import '@/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import { ToastContainer } from '@/components/ToastContainer';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className="dark">
      <head>
        <title>Que Vendes</title>
      </head>
      <body className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
        <ClerkProvider>
          <Header />
          <ThemeToggle />
          <main className="flex-1 container mx-auto px-4 py-6">
            {children}
          </main>
          <Footer />
          <ToastContainer />
        </ClerkProvider>
      </body>
    </html>
  );
}
