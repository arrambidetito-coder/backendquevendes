import Link from 'next/link';
import CategoryList from '@/components/CategoryList';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-10 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Descubre y Apoya a Emprendedores Locales
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
          Explora negocios locales, productos únicos y servicios cerca de ti.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/feed"
            className="px-5 py-2.5 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition"
          >
            Explorar Feed
          </Link>
          <Link
            href="/dashboard/stats"
            className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Ver Estadísticas
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Categorías Populares
        </h2>
        <CategoryList />
      </section>
    </div>
  );
}
