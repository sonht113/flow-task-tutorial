import { EnumPositionUser } from 'src/ts/common';
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  fullname: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  position: EnumPositionUser;
}
