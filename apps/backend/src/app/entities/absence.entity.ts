import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'abcenses' })
export class AbsenceEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column()
  type: string;

  @Column()
  comment: string;
}
