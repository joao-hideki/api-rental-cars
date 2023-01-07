import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if(!authHeader) {
    throw new Error('Token missing');
  }
  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, '5f4dcc3b5aa765d61d8327deb882cf99') as IPayload;
    next();
    const usersRepository = new UsersRepository();
    const userAlreadyExists = usersRepository.findById(user_id);
    if(!userAlreadyExists) {
      throw new Error('User does not exists!');
    }
  } catch {
    throw new Error('Invalid token!');
  }
}