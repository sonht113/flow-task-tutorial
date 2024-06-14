import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}
  async create(createProjectDto: CreateProjectDto) {
    try {
      return await this.projectRepository.save({
        id: uuid(),
        ...createProjectDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findAll() {
    try {
      return await this.projectRepository.find();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findByGroup(group: string) {
    try {
      return await this.projectRepository.find({
        where: {
          group,
        },
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findOne(id: string) {
    try {
      return await this.projectRepository.findOne({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    try {
      let project = await this.projectRepository.findOne({
        where: {
          id,
        },
      });
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      project = { ...project, ...updateProjectDto, updatedAt: new Date() };
      return this.projectRepository.save(project);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async remove(id: string) {
    try {
      const project = await this.projectRepository.findOne({
        where: {
          id,
        },
      });
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      return this.projectRepository.remove(project);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
