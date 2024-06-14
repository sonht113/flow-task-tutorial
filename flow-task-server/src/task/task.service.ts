import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import { EnumStatus } from 'src/ts/common';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      return await this.taskRepository.save({
        id: uuid(),
        ...createTaskDto,
        status: createTaskDto.status ? createTaskDto.status : EnumStatus.TODO,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findAll() {
    try {
      return await this.taskRepository.find();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findAllByProject(project: string) {
    try {
      return await this.taskRepository.find({
        where: {
          project,
        },
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findOne(id: string) {
    return await this.taskRepository.find({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      let task = await this.taskRepository.findOne({
        where: {
          id,
        },
      });
      if (!task) {
        throw new NotFoundException('Task not found');
      }
      task = { ...task, ...updateTaskDto, updatedAt: new Date() };
      return this.taskRepository.save(task);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async remove(id: string) {
    try {
      const task = await this.taskRepository.findOne({
        where: {
          id,
        },
      });
      if (!task) {
        throw new NotFoundException('Task not found');
      }
      return this.taskRepository.remove(task);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
