import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn, UpdateDateColumn, CreateDateColumn, OneToMany } from "typeorm";
import { ArticleImg } from "./article_img.entity";
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

    @Column()
    content: string

    @Column()
    words: string

    @Column({default: 0})
    views: number

    @Column({default: 0})
    liked: number

    @CreateDateColumn()
    created_date: Date;

    @UpdateDateColumn()
    updated_date: Date;

    @ManyToOne(type => User, user => user.article)
    @JoinColumn({name: 'user_id'})
    user: User

    @OneToMany(type => ArticleImg, img => img.article)
    images: ArticleImg[]

    @OneToMany(type => Tags, tags => tags.article)
    tags: Tags[]

    @OneToMany(type => Comment, comment => comment.article)
    comment: Comment[]
}