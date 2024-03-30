// src/token.ts
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config';

export const createToken = (id: string, email: string, expiresIn:string ) => {
  const payload = { id, email };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn,
  });
  return token;
};
