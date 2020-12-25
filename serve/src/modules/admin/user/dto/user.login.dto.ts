import { IsNotIn } from 'class-validator';

export class UserLoginDto {

    @IsNotIn(['',undefined,null], {message:'用户名不能为空'})
    username: string;

    password: string;
}