import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';
import { demoUser } from '../data/demo';
import { findAccount, upsertAccount } from '../data/accounts';

export const authRouter = Router();

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) {
    return res.status(400).json({ message: 'E-mail e senha são obrigatórios' });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ message: 'JWT_SECRET não configurado' });
  }

  const account = findAccount(email);
  if (!account) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const isValid = await bcrypt.compare(password, account.passwordHash);
  if (!isValid) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const token = jwt.sign({ sub: account.user.id, email: account.user.email }, secret, { expiresIn: '7d' });
  return res.json({ token, user: account.user });
});

authRouter.post('/register', async (req, res) => {
  const { name, email, password } = req.body as { name?: string; email?: string; password?: string };
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = upsertAccount(
    {
      ...demoUser,
      id: randomUUID(),
      name,
      email,
    },
    passwordHash,
  );
  return res.status(201).json({ user });
});

authRouter.post('/forgot-password', (_req, res) => {
  return res.json({ message: 'Link de recuperação enviado' });
});

authRouter.post('/reset-password', (_req, res) => {
  return res.json({ message: 'Senha atualizada com sucesso' });
});

authRouter.get('/me', (_req, res) => {
  return res.json({ user: demoUser });
});
