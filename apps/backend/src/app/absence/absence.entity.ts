import { UserEntity } from './../user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'abcenses_table' })
export class AbsenceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.absences)
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
