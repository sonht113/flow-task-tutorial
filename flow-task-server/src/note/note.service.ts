import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { messageConstants } from 'src/constants/message';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}
  async create(createNoteDto: CreateNoteDto) {
    try {
      return await this.noteRepository.save({
        id: uuid(),
        ...createNoteDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findAll() {
    try {
      return await this.noteRepository.find();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findOne(id: string) {
    try {
      return await this.noteRepository.findOne({
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
    updateNoteDto: UpdateNoteDto,
  ): Promise<{ status: number; message: string }> {
    try {
      let note = await this.noteRepository.findOne({
        where: {
          id,
        },
      });
      if (!note) {
        throw new NotFoundException('Note not found');
      }
      note = { ...note, ...updateNoteDto, updatedAt: new Date() };
      await this.noteRepository.save(note);
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
      const note = await this.noteRepository.findOne({
        where: {
          id,
        },
      });
      if (!note) {
        throw new NotFoundException('Note not found');
      }
      await this.noteRepository.remove(note);
      return {
        status: HttpStatus.OK,
        message: messageConstants.delete,
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
