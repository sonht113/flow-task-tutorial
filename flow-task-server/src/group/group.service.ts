import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import { messageConstants } from 'src/constants/message';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
  ) {}
  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    try {
      return await this.groupRepository.save({
        id: uuid(),
        ...createGroupDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findAll() {
    try {
      return await this.groupRepository.find();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findOne(id: string) {
    try {
      return await this.groupRepository.findOne({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async update(
    id: string,
    updateGroupDto: UpdateGroupDto,
  ): Promise<{ status: number; message: string }> {
    try {
      let group = await this.groupRepository.findOne({
        where: {
          id,
        },
      });
      if (!group) {
        throw new NotFoundException('Group not found');
      }
      group = { ...group, ...updateGroupDto, updatedAt: new Date() };
      await this.groupRepository.save(group);
      return {
        status: HttpStatus.OK,
        message: messageConstants.update,
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async remove(id: string): Promise<{ status: number; message: string }> {
    try {
      const group = await this.groupRepository.findOne({
        where: {
          id,
        },
      });
      if (!group) {
        throw new NotFoundException('Group not found');
      }
      await this.groupRepository.remove(group);
      return {
        status: HttpStatus.OK,
        message: messageConstants.delete,
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
