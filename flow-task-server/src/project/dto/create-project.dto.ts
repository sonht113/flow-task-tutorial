import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  avatar: string;

  @IsOptional()
  subName: string;

  @IsNotEmpty()
  poriority: number;

  @IsNotEmpty()
  group: string;

  @IsNotEmpty()
  tags: number[];

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  deadline: Date;
}
