import { PrimaryGeneratedColumn, Column, Entity, OneToOne, OneToMany, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { Article } from "./article.entity";
import { Profile } from './profile.entity'
import { Tags } from "./tags.entity";
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

    @Column({
        comment: '是否为超管，1是 2不是',
        default: 2
    })
    role: number

    @CreateDateColumn()
    created_date: Date;

    @UpdateDateColumn()
    updated_date: Date;

    @OneToOne(type => Profile, profile => profile.user)
    profile: Profile

    @OneToMany(type => Article, article => article.user)
    article: Article[]

    @OneToMany(type => Tags, tags => tags.user)
    tags: Tags[]
}