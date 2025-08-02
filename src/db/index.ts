
import { PrismaClient } from '../generated/prisma' // 👈 custom output path

declare global {
  // Allow global to have a cached PrismaClient in development
  // `var` is used to allow reassignment during hot-reloading
  var cachedPrisma: PrismaClient
}

let prisma: PrismaClient

try {
  if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
  } else {
    if (!global.cachedPrisma) {
      global.cachedPrisma = new PrismaClient()
    }
    prisma = global.cachedPrisma
  }
} catch (error) {
  console.error('Failed to initialize Prisma Client:', error)
  throw error
}

export const db = prisma
