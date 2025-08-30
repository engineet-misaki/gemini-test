import { PrismaClient } from '@prisma/client';

// Next.js aplication is in development, the command `next dev` clears Node.js cache on every run.
// This creates a new `PrismaClient` instance each time, which can lead to connection pool exhaustion.
// The following code solves this problem by storing `PrismaClient` on a global object.

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
