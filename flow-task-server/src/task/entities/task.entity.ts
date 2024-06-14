import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Task {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  status: number;

  @Column()
  assignName: string;

  @Column()
  tags: number[];

  @Column()
  poriority: number;

  @Column()
  project: string;

  @Column()
  description: string;

  @Column()
  deadline: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: null, nullable: true })
  updatedAt: Date;
}
