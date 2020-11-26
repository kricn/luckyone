import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn } from "typeorm";
import { User } from './user.entity'
@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255})
    avatar: string;

    @Column()
    cover: string;

    @Column()
    article: string

    @Column()
    summary: string

    @OneToOne(type => User, user => user.profile)
    // @JoinColumn({name: 'user_name', referencedColumnName: 'username'})
    @JoinColumn({name: 'user_id'})
    user: User
}