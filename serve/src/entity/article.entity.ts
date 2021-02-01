import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn, UpdateDateColumn, CreateDateColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Tags } from "./tags.entity";
import { User } from './user.entity'
import { Comment } from './comment.entity'
@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string

    @Column()
    cover: string

    @Column({nullable: true})
    summary: string

    @Column('longtext')
    content: string

    @Column({
        comment: '字数',
        default: 0
    })
    words: number

    @Column({default: 0})
    views: number

    @Column({default: 0})
    liked: number

    @Column({
        default: 1,
        comment: '文章类型'
    })
    type: number

    @Column({
        nullable: true,
        default: 0,
        comment: '排序位置'
    })
    order: number

    @Column({default: 1, comment: '是否显示'})
    status: number

    @CreateDateColumn()
    created_date: Date;

    @UpdateDateColumn()
    updated_date: Date;

    @ManyToMany(type => Tags, tags => tags.articles)
    @JoinTable()
    tags: Tags[]

    @OneToMany(type => Comment, comment => comment.article)
    comment: Comment[]

    @ManyToOne(type => User, user => user.article)
    @JoinColumn({name: 'user_id'})
    user: User
}