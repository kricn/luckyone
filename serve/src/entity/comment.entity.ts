import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Article } from './article.entity'
@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string

    @Column()
    content: string

    @CreateDateColumn()
    created_date: Date;

    @UpdateDateColumn()
    updated_date: Date;

    @ManyToOne(type => Article, article => article.comment, {
        onDelete: 'SET NULL'
    })
    @JoinColumn({name: 'article_id'})
    article: Article
}