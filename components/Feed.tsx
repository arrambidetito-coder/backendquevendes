'use client';

import { useEffect, useState } from 'react';

type Post = {
  id: string;
  imageUrl: string;
  caption: string;
  createdAt: string;
};

const DEMO_POSTS: Post[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=600&q=80',
    caption: 'Productos artesanales locales recién hechos',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
    caption: 'Regalos personalizados para toda ocasión',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80',
    caption: 'Moda y diseño de emprendedores de tu ciudad',
    createdAt: new Date().toISOString(),
  },
];

function SkeletonPost() {
  return (
    <div className="border rounded p-3 bg-white dark:bg-gray-800 animate-pulse">
      <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded" />
      <div className="mt-2 h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
    </div>
  );
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/feed')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data);
        } else {
          setPosts(DEMO_POSTS);
        }
        setLoading(false);
      })
      .catch(() => {
        setPosts(DEMO_POSTS);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <SkeletonPost key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
      {posts.map((p) => (
        <div key={p.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <img src={p.imageUrl} alt={p.caption} className="w-full h-48 object-cover" />
          <p className="p-3 text-gray-800 dark:text-gray-200">{p.caption}</p>
        </div>
      ))}
    </div>
  );
}
