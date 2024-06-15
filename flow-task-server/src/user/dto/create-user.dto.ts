import { IsNotEmpty } from 'class-validator';
import { EnumPositionUser } from 'src/ts/common';

export class CreateUserDto {
  @IsNotEmpty()
  fullname: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  position: EnumPositionUser;
}
