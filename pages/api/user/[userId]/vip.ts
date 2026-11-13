import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(_req);
  if (!userId) return res.status(401).json({ error: 'Unauthenticated' });
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { isVip: true } });
  res.status(200).json({ isVip: user?.isVip ?? false });
}
