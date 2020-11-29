import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Article } from './article.entity'
@Entity()
export class ArticleImg {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string

    @Column()
    title: string

    @CreateDateColumn()
    created_date: Date;

    @UpdateDateColumn()
    updated_date: Date;

    @ManyToOne(type => Article, article => article.images)
    @JoinColumn({name: 'article_id'})
    article: Article
}