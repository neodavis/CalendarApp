import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryColumn()
  public user_id: number;

  @Column({ unique: true })
  public username: string;

  @Column()
  public password: string;

  @Column({ nullable: true })
  public token: string;
}
