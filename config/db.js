import dotenv from 'dotenv'; 

dotenv.config(); // Loads the environment variables from the env file

// I use Prisma as an ORM 
// ORM - ORM stands for Object-Relational Mapping. It's a programming technique that creates a "bridge" between object-oriented programming languages and relational databases.
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default prisma