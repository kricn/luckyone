import { PrimaryGeneratedColumn, Column, Entity, OneToOne } from "typeorm";
import { Avatar } from './avatar.entity'
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

    @OneToOne(type => Avatar, avatar => avatar.user)
    avatar: Avatar

    @Column({
        default: 1
    })
    role: number;
}