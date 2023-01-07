import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: {
    name: string,
    email: string
  };
  token: string;
}

@injectable()
class AuthenticaUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository:IUsersRepository
  ) {}

  async execute({email, password}: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if(!user) {
      throw new Error('Email or/and password incorrect');
    }
    const passwordMath = await compare(password, user.password);
    if(!passwordMath) {
      throw new Error('Email or/and password incorrect');
    }
    const token = sign({}, '5f4dcc3b5aa765d61d8327deb882cf99', {
      subject: user.id,
      expiresIn: '1d'
    });

    return {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    };
  }
}

export {AuthenticaUserUseCase};