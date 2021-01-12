import { IsNotIn } from 'class-validator';

export class TagsAddDTO {

    @IsNotIn(['',undefined,null], {message:'标签名字(name)不能为空'})
    name: string
}