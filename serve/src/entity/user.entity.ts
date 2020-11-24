import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 45, unique: true})
    username: string;

    @Column({
        length: 45,
        default: ""
    })
    nickname: string;

    @Column({length: 20})
    password: string;

    @Column({
        default: 1
    })
    type: number;
}