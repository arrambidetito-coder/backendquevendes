import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getAuth } from '@clerk/nextjs/server';
import { index } from '@/lib/algolia';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: 'Unauthenticated' });

  // Obtener el perfil para asegurar que pertenece al usuario
  const profile = await prisma.businessProfile.findUnique({ where: { userId } });
  if (!profile) return res.status(404).json({ error: 'Profile not found' });

  if (req.method === 'GET') {
    const products = await prisma.product.findMany({ where: { profileId: profile.id } });
    return res.status(200).json(products);
  }

  if (req.method === 'POST') {
    const existingCount = await prisma.product.count({ where: { profileId: profile.id } });
    if (existingCount >= 6) {
      return res.status(400).json({ error: 'Límite de 6 productos alcanzado' });
    }
    const { name, description, imageUrl, price } = req.body;
    const newProduct = await prisma.product.create({
      data: {
        profileId: profile.id,
        name,
        description,
        imageUrl,
        price,
      },
    });

    // Re‑indexar en Algolia (producto como sub‑registro)
    await index.partialUpdateObject({
      objectID: profile.id,
      products: { // Algolia no soporta arrays de objetos complejos sin estructurar, simplificamos a IDs
        add: [newProduct.id],
      },
    }, { createIfNotExists: true });

    return res.status(201).json(newProduct);
  }

  if (req.method === 'DELETE') {
    const { productId } = req.query;
    if (typeof productId !== 'string') return res.status(400).json({ error: 'productId required' });
    // Verificar que el producto pertenece al usuario
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product || product.profileId !== profile.id) {
      return res.status(403).json({ error: 'No autorizado' });
    }
    await prisma.product.delete({ where: { id: productId } });
    // Opcional: actualizar Algolia (eliminación simplificada)
    await index.partialUpdateObject({ objectID: profile.id, products: { remove: [productId] } });
    return res.status(200).json({ ok: true });
  }

  res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
