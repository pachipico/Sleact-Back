import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelMembers } from '../entities/ChannelMembers';
import { Channels } from '../entities/Channels';
import { Users } from '../entities/Users';
import { Workspaces } from '../entities/Workspaces';
import { Repository } from 'typeorm';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Channels)
    private channelsRepository: Repository<Channels>,
    @InjectRepository(ChannelMembers)
    private channelMembersRepository: Repository<ChannelMembers>,
    @InjectRepository(Workspaces)
    private workspacesRepository: Repository<Workspaces>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  getWorkspaceChannels(url: string, myId: number) {
    return this.channelsRepository
      .createQueryBuilder('channels')
      .innerJoinAndSelect(
        'channels.ChannelMembers',
        'channelMembers',
        'channelMembers.id = :id',
        { id: myId },
      )
      .innerJoinAndSelect(
        'channels.workspaces',
        'workspaces',
        'workspaces.url = :url',
        { url },
      )
      .getMany();
  }

  getWorkspaceChannel(url: string, name: string) {
    return this.channelsRepository.findOne({
      where: { name },
      relations: ['Workspace'],
    });
  }

  getChats() {}

  getAllMembers() {}

  createChannel() {}

  saveChat() {}

  inviteMember() {}
}
