import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'abcenses'})
export class AbsenceEntity {
    @PrimaryColumn()
    id: number

    @Column()
    start: string

    @Column()
    end: string

    @Column()
    type: string

    @Column()
    comment: string
}