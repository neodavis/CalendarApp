import { AbsenceEntity } from './../absence/absence.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  public userId: number;

  @Column({ unique: true })
  public username: string;

  @Column()
  public password: string;

  @OneToMany(() => AbsenceEntity, (absence: AbsenceEntity) => absence.userId)
  public absences: AbsenceEntity[];
}
