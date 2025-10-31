import 'dotenv/config'
console.log('DATABASE_URL:', process.env.DATABASE_URL)

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

try {
  await prisma.$connect()
  console.log('Conectou com sucesso!')
} catch (err) {
  console.error('Erro ao conectar:', err)
}
