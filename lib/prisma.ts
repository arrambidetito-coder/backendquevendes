import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // In production, use a singleton to avoid exhausting DB connections.
  prisma = new PrismaClient();
  // @ts-ignore
  global.prisma = prisma;
} else {
  // In development, attach prisma to the global object so it persists across HMR.
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient();
  }
  // @ts-ignore
  prisma = global.prisma;
}

export default prisma;
