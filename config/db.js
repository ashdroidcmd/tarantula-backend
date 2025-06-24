require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


async function testPrismaConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Prisma connected to PostgreSQL');
  } catch (error) {
    console.error('❌ Prisma DB connection failed:', error);
  }
}

testPrismaConnection();

module.exports = prisma;