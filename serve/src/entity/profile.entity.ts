import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
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
    
    @CreateDateColumn()
    created_date: Date;

    @UpdateDateColumn()
    updated_date: Date;

    @OneToOne(type => User, user => user.profile)
    // @JoinColumn({name: 'user_name', referencedColumnName: 'username'})
    @JoinColumn({name: 'user_id'})
    user: User
}