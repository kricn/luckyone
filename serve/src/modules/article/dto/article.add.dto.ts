import { IsNotIn } from 'class-validator';

export class ArticleAddDTO {

    @IsNotIn(['',undefined,null], {message:'标题不能为空'})
    title: string;

    @IsNotIn(['', undefined, null], {message: '内容不能为空'})
    content: string;
}