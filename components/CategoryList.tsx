'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Category = {
  name: string;
};

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('/api/categories')
      .then(r => r.json())
      .then(setCategories);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {categories.map(cat => (
        <Link
          key={cat.name}
          href={`/categories/${cat.name.toLowerCase()}`}
          className="block p-4 bg-white rounded shadow hover:bg-gray-50 text-center"
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
