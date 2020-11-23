import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 45})
    username: string;

    @Column({length: 45})
    nickname: string;

    @Column({length: 20})
    password: string;

    @Column({
        default: 1
    })
    type: number;
}