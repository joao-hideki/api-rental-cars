import { container } from 'tsyringe';
import { AuthenticaUserUseCase } from './AuthenticaUserUseCase';
import { Request, Response } from 'express';

class AuthenticaUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {email, password} = req.body;
    const authenticateUserUseCase = container.resolve(AuthenticaUserUseCase);
    const token = await authenticateUserUseCase.execute({email, password});
    return res.status(200).json(token);
  }
}

export {AuthenticaUserController};