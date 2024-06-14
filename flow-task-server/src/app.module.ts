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
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    TaskModule,
    ProjectModule,
    GroupModule,
    TodoModule,
    NoteModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
