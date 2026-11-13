import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: 'Unauthenticated' });

  const profile = await prisma.businessProfile.findUnique({
    where: { userId },
    include: { products: true },
  });

  if (req.method === 'GET') {
    return res.status(200).json(profile);
  }

  if (req.method === 'POST') {
    const {
      businessName,
      description,
      logoUrl,
      bannerUrl,
      hasPhysicalLocation,
      address,
      latitude,
      longitude,
      categories,
    } = req.body;
    const updated = await prisma.businessProfile.upsert({
      where: { userId },
      create: {
        userId,
        businessName,
        description,
        logoUrl,
        bannerUrl,
        hasPhysicalLocation,
        address,
        latitude,
        longitude,
        categories,
      },
      update: {
        businessName,
        description,
        logoUrl,
        bannerUrl,
        hasPhysicalLocation,
        address,
        latitude,
        longitude,
        categories,
      },
    });

    // Re‑index en Algolia
    const { index } = await import('@/lib/algolia');
    await index.saveObject({
      objectID: updated.id,
      businessName: updated.businessName,
      isVip: (await prisma.user.findUnique({ where: { id: userId } }))?.isVip ?? false,
      categories: updated.categories,
    });

    return res.status(200).json(updated);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
