import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  assignName: string;

  @IsNotEmpty()
  tags: number[];

  @IsNotEmpty()
  poriority: number;

  @IsNotEmpty()
  status: number;

  @IsNotEmpty()
  project: string;

  @IsOptional()
  description: string;
}
