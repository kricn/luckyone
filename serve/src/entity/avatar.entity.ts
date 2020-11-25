import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn } from "typeorm";
import { User } from './user.entity'
@Entity()
export class Avatar {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255})
    name: string;

    @Column()
    avatar_url: string;

    @OneToOne(type => User, user => user.avatar)
    @JoinColumn()
    user: User
}