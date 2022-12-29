import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  public userId: number;

  @Column({ unique: true })
  public username: string;

  @Column()
  public password: string;
}
