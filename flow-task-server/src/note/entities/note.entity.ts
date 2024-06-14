import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Note {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  tags: number[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: null, nullable: true })
  updatedAt: Date;
}
