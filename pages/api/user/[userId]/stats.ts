import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: 'Unauthenticated' });

  const profile = await prisma.businessProfile.findUnique({
    where: { userId },
    include: { stats: true },
  });
  if (!profile) return res.status(404).json({ error: 'Profile not found' });

  if (req.method === 'GET') {
    return res.status(200).json(profile.stats ?? { profileViews: 0, postInteractions: 0 });
  }

  // No other methods needed for now
  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
