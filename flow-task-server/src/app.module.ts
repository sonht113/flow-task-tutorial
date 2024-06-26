import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { ProjectModule } from './project/project.module';
import { GroupModule } from './group/group.module';
import { TodoModule } from './todo/todo.module';
import { NoteModule } from './note/note.module';
import { multerOptions } from './utils/multer-option';
import { MulterModule } from '@nestjs/platform-express';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Task } from './task/entities/task.entity';
import { Project } from './project/entities/project.entity';
import { Group } from './group/entities/group.entity';
import { Todo } from './todo/entities/todo.entity';
import { Note } from './note/entities/note.entity';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    MulterModule.register(multerOptions),
    ConfigModule.forRoot({
      envFilePath: ['.env.dev', '.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DB_URL,
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Task, Project, Group, Todo, Note, User],
    }),
    TaskModule,
    ProjectModule,
    GroupModule,
    TodoModule,
    NoteModule,
    UploadModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
