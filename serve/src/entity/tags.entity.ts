import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToMany, JoinTable } from "typeorm";
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

    @CreateDateColumn({
        select: false
    })
    created_date: Date;

    @UpdateDateColumn({
        select: false
    })
    updated_date: Date;

    @ManyToMany(type => Article, articles => articles.tags)
    @JoinTable()
    articles: Article[]
}