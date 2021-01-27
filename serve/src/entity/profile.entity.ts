import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { User } from './user.entity'
@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
        comment: '头像'
    })
    avatar: string;

    @Column({
        nullable: true,
        comment: '首页封面'
    })
    cover: string;

    @Column({
        nullable:true,
        comment: '封面文章'
    })
    article: number;

    @Column({
        nullable: true,
        comment: '封面文章的简介'
    })
    summary: string

    @Column({
        nullable: true,
        comment: '备案文字'
    })
    ipx_text: string

    @Column({
        nullable: true,
        comment: '备案链接'
    })
    ipx_link: string
    
    @CreateDateColumn()
    created_date: Date;

    @UpdateDateColumn()
    updated_date: Date;

    @OneToOne(type => User, user => user.profile)
    // @JoinColumn({name: 'user_name', referencedColumnName: 'username'})
    @JoinColumn({name: 'user_id'})
    user: User
}