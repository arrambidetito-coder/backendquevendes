'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useEffect, useState } from 'react';
import { useClerk } from '@clerk/nextjs';

type DailyStat = {
  date: string;
  views: number;
  interactions: number;
};

export default function StatsChart() {
  const { user } = useClerk();
  const [data, setData] = useState<DailyStat[]>([]);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/user/${user.id}/stats/daily`)
      .then(r => r.json())
      .then(setData);
  }, [user?.id]);

  if (!data.length) return <p>Cargando estadísticas…</p>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="views" name="Visitas" fill="#2563EB" />
        <Bar dataKey="interactions" name="Interacciones" fill="#10B981" />
      </BarChart>
    </ResponsiveContainer>
  );
}
