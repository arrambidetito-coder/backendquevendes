'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Post = {
  id: string;
  imageUrl: string;
  caption: string;
  createdAt: string;
};

function SkeletonPost() {
  return (
    <div className="border rounded p-3 bg-white animate-pulse">
      <div className="h-48 bg-gray-300 rounded" />
      <div className="mt-2 h-4 bg-gray-300 rounded w-3/4" />
    </div>
  );
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/feed')
      .then(r => r.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(4)].map((_, i) => (
          <SkeletonPost key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
      {posts.map(p => (
        <div key={p.id} className="bg-white rounded shadow">
          <Image src={p.imageUrl} alt={p.caption} width={400} height={400} className="rounded-t" />
          <p className="p-2">{p.caption}</p>
        </div>
      ))}
    </div>
  );
}
