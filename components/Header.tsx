import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary dark:text-white">
          Que Vendes
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-gray-700 dark:text-gray-200">
          <Link href="/" className="hover:text-primary">
            Inicio
          </Link>
          <Link href="/feed" className="hover:text-primary">
            Feed
          </Link>
          <Link href="/dashboard/stats" className="hover:text-primary">
            Estadísticas
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
