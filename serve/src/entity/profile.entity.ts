import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { User } from './user.entity'
@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    avatar: string;

    @Column({nullable: true})
    cover: string;

    @Column({nullable:true})
    article: string

    @Column({nullable: true})
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