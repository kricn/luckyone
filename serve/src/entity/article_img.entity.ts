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

    @CreateDateColumn({
        select: false
    })
    created_date: Date;

    @UpdateDateColumn({
        select: false
    })
    updated_date: Date;

    @ManyToOne(type => Article, article => article.images, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'article_id'})
    article: Article
}