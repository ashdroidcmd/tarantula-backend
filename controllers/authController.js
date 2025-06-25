// bycrypt - Used to hash passwords before storing them in a database and to compare login passwords.
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Controllers - is a JavaScript module or function that contains the logic for handling requests and responses.
const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Register
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    });

    const token = createToken(user.id);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(400).json({ error: 'User already exists or invalid data.' });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  const token = createToken(user.id);
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
};

export default { login, register };