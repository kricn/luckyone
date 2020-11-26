import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn } from "typeorm";
import { User } from './user.entity'
@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: ""
    })
    avatar: string;

    @Column({
        default: ""
    })
    cover: string;

    @Column({
        default: ""
    })
    article: string

    @Column({
        default: ""
    })
    summary: string

    @OneToOne(type => User, user => user.profile)
    // @JoinColumn({name: 'user_name', referencedColumnName: 'username'})
    @JoinColumn({name: 'user_id'})
    user: User
}