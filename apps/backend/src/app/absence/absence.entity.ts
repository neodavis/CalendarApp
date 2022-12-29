import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'abcenses_table' })
export class AbsenceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;
  
  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column()
  type: string;

  @Column()
  comment: string;
}
