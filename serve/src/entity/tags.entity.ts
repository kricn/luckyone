import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Article } from './article.entity'
@Entity()
export class Tags {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        comment: '标签名字'
    })
    name: string

    @Column({
        comment: '文章标题'
    })
    title: string

    @CreateDateColumn()
    created_date: Date;

    @UpdateDateColumn()
    updated_date: Date;

    @ManyToOne(type => Article, article => article.tags)
    @JoinColumn({name: 'article_id'})
    article: Article
}