import { HttpException, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/Users';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}
  getUsers() {}

  async join(email: string, password: string, nickname: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      throw new HttpException('User already exists', 401);
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}
