import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Project {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column()
  subName: string;

  @Column()
  poriority: number;

  @Column()
  group: string;

  @Column()
  tags: number[];

  @Column()
  author: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: null, nullable: true })
  updatedAt: Date;
}
