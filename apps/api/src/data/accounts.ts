import bcrypt from 'bcryptjs';
import type { User } from '../types';
import { demoUser } from './demo';

const defaultPasswordHash = bcrypt.hashSync('123456', 10);

export type AccountRecord = {
  user: User;
  passwordHash: string;
};

const accounts = new Map<string, AccountRecord>([[
  demoUser.email,
  {
    user: demoUser,
    passwordHash: defaultPasswordHash,
  },
]]);

export function findAccount(email: string) {
  return accounts.get(email.toLowerCase());
}

export function upsertAccount(user: User, passwordHash: string) {
  accounts.set(user.email.toLowerCase(), { user, passwordHash });
  return user;
}
