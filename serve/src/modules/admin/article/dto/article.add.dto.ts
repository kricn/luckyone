import { IsNotIn, IS_ALPHA } from 'class-validator';

export class ArticleAddDTO {

    @IsNotIn(['',undefined,null], {message:'标题不能为空'})
    title: string;

    @IsNotIn(['', undefined, null], {message: '内容不能为空'})
    content: string;

    @IsNotIn(['', null, undefined], {message: '图片路径不能为空'})
    cover: string

    @IsNotIn(['', null, undefined], {message: '字数不能为空'})
    words: string
}