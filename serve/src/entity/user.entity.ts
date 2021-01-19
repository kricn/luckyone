import { PrimaryGeneratedColumn, Column, Entity, OneToOne, OneToMany, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { Article } from "./article.entity";
import { Profile } from './profile.entity'
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 45, unique: true})
    username: string;

    @Column({
        length: 45,
        nullable: true
    })
    nickname: string;

    @Column({length: 20})
    password: string;

    @CreateDateColumn()
    created_date: Date;

    @UpdateDateColumn()
    updated_date: Date;

    @OneToOne(type => Profile, profile => profile.user)
    profile: Profile
}