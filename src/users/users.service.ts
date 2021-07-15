import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/Users';
import bcrypt from 'bcrypt';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { ChannelMembers } from 'src/entities/ChannelMembers';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(WorkspaceMembers)
    private workspaceMembersRepository: Repository<WorkspaceMembers>,
    @InjectRepository(ChannelMembers)
    private channelMembersRepository: Repository<ChannelMembers>,
  ) {}

  async join(email: string, password: string, nickname: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      throw new HttpException('User already exists', 401);
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const returned = await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
    await this.workspaceMembersRepository.save({
      UserId: returned.id,
      WorkspaceId: 1,
    });
    await this.channelMembersRepository.save({
      UserId: returned.id,
      ChannelId: 1,
    });
    return true;
  }
}
