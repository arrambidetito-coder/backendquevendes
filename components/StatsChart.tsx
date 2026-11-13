'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useEffect, useState } from 'react';

type DailyStat = {
  date: string;
  views: number;
  interactions: number;
};

const DEMO_STATS: DailyStat[] = [
  { date: 'Lun', views: 24, interactions: 5 },
  { date: 'Mar', views: 38, interactions: 9 },
  { date: 'Mié', views: 31, interactions: 7 },
  { date: 'Jue', views: 45, interactions: 12 },
  { date: 'Vie', views: 52, interactions: 15 },
];

export default function StatsChart() {
  const [data, setData] = useState<DailyStat[]>(DEMO_STATS);

  useEffect(() => {
    fetch('/api/user/demo/stats/daily')
      .then((r) => (r.ok ? r.json() : null))
      .then((res) => {
        if (Array.isArray(res) && res.length > 0) {
          setData(res);
        }
      })
      .catch(() => {});
  }, []);

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
