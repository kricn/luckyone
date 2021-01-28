import { IsNotIn } from 'class-validator';

export class ArticleAddDTO {

    @IsNotIn(['',undefined,null], {message:'标题不能为空'})
    title: string;

    @IsNotIn(['', undefined, null], {message: '内容不能为空'})
    content: string;

    summary: string;

    @IsNotIn(['', null, undefined], {message: '图片路径不能为空'})
    cover: string

    words?: number

    // user?: any

    images?: string[]

    tags?: any

    type: number

    status?: number

    order: number
}