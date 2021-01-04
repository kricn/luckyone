import { IsNotIn } from 'class-validator';

export class ArticleGetDTO {
    //文章id
    id?: string
    //文章标题
    title?: string
    //文章标签
    tags?: string
    //用户信息
    user?: {
        id: number
    }
}