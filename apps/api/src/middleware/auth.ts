import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: string;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token ausente' });
  }

  const token = header.slice(7);
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ message: 'JWT_SECRET não configurado' });
  }

  try {
    const payload = jwt.verify(token, secret) as { sub?: string };
    req.userId = payload.sub;
    next();
  } catch {
    return res.status(401).json({ message: 'Token inválido' });
  }
}
