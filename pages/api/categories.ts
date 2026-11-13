import { NextApiRequest, NextApiResponse } from 'next';
import { Category } from '@prisma/client';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const categories = Object.values(Category).map((name) => ({ name }));
  res.status(200).json(categories);
}
