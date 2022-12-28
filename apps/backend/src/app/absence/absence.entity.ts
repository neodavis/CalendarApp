import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'abcenses_table' })
export class AbsenceEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  user_id: number;
  
  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column()
  type: string;

  @Column()
  comment: string;
}
