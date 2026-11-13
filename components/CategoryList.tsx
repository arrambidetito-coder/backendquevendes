'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Category = {
  name: string;
};

const FALLBACK_CATEGORIES: Category[] = [
  { name: 'ALIMENTOS' },
  { name: 'REGALOS_PERSONALIZADOS' },
  { name: 'MODA' },
  { name: 'SERVICIOS' },
  { name: 'OTROS' },
];

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>(FALLBACK_CATEGORIES);

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {categories.map((cat) => (
        <Link
          key={cat.name}
          href={`/categories/${cat.name.toLowerCase()}`}
          className="block p-4 bg-white dark:bg-gray-800 dark:text-white rounded shadow hover:bg-gray-50 dark:hover:bg-gray-700 text-center transition"
        >
          {cat.name.replace(/_/g, ' ')}
        </Link>
      ))}
    </div>
  );
}
