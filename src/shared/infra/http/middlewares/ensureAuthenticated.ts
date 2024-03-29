import { NextFunction, Request, Response, request } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '../../../errors/AppError';


interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if(!authHeader) {
    throw new AppError('Token missing', 401);
  }
  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, '5f4dcc3b5aa765d61d8327deb882cf99') as IPayload;
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);
    if(!user) {
      throw new AppError('User does not exists!', 401);
    }
    request.user = {
      id: user_id
    };
    next();
  } catch {
    throw new AppError('Invalid token!', 401);
  }
}