import { Injectable } from '@nestjs/common';
import { ChannelMembers } from 'src/entities/ChannelMembers';
import { Channels } from 'src/entities/Channels';
import { Users } from 'src/entities/Users';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { Workspaces } from 'src/entities/Workspaces';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspaces)
    private workspacesRepository: Repository<Workspaces>,
    @InjectRepository(WorkspaceMembers)
    private workspaceMembersRepository: Repository<WorkspaceMembers>,
    @InjectRepository(Channels)
    private channelsRepository: Repository<Channels>,
    @InjectRepository(ChannelMembers)
    private channelsMembersRepository: Repository<ChannelMembers>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findById(id: number) {
    return await this.workspaceMembersRepository.findByIds([id]);
  }

  async findMyWorkspaces(myId: number) {
    return this.workspacesRepository.find({
      where: { WorkspaceMembers: [{ UserId: myId }] },
    });
  }

  async createWorkspace(workspace: string, url: string, myId: number) {
    const newWorkspace = this.workspacesRepository.create({
      name: workspace,
      url,
      OwnerId: myId,
    });
    const returned = await this.workspacesRepository.save(newWorkspace);

    const workspaceMember = new WorkspaceMembers();
    workspaceMember.UserId = myId;
    workspaceMember.WorkspaceId = returned.id;

    const channel = new Channels();
    channel.name = '일반';
    channel.WorkspaceId = returned.id;
    const [, returnedChannel] = await Promise.all([
      await this.workspaceMembersRepository.save(workspaceMember),
      await this.channelsRepository.save(channel),
    ]);

    const channelMembers = new ChannelMembers();
    channelMembers.ChannelId = returnedChannel.id;
    channelMembers.UserId = myId;
    await this.channelsMembersRepository.save(channelMembers);
  }

  getWorkspaceMembers(url: string) {
    return this.workspacesRepository
      .createQueryBuilder('user')
      .innerJoin('user.WorkspaceMembers', 'members')
      .innerJoin('members.Workspace', 'workspace', 'workspace.url = :url', {
        url,
      })
      .getMany();
  }

  async createWorkspaceMembers(url: string, email: string) {
    const workspace = await this.workspacesRepository.findOne({
      where: { url },
      join: {
        alias: 'workspace',
        innerJoinAndSelect: {
          channels: 'workspace.Channels',
        },
      },
    });
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      return null;
    }
    const workspaceMember = new WorkspaceMembers();
    workspaceMember.UserId = user.id;
    workspaceMember.WorkspaceId = workspace.id;
    await this.workspaceMembersRepository.save(workspaceMember);

    const channelMember = new ChannelMembers();
    channelMember.ChannelId = workspace.Channels.find(
      (v) => v.name === '일반',
    ).id;
    channelMember.UserId = user.id;
    await this.channelsMembersRepository.save(channelMember);
  }

  getWorkspaceMember(url: string, id: number) {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .innerJoinAndSelect(
        'user.workspace',
        'workspaces',
        'workspaces.url = :url',
        {
          url,
        },
      )
      .getOne();
  }
}
