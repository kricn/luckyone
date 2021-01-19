import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Query, Request } from '@nestjs/common';
import { Result } from 'src/common/interface/result.interface';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service'

@Controller('admin/user')
export class UserController {
    constructor(
        private readonly userService: UserService, 
        private readonly authService: AuthService
    ) {}
    
    //登录
    @Post('/login')
    async login(@Body() body) {
        if (!body.username || !body.password) {
            throw new HttpException({
                message: '用户名或密码不能为空'
            }, HttpStatus.BAD_REQUEST)
        }
        const res = await this.authService.validateUser(body.username, body.password)
        switch (res.code) {
            case 0:
                return await this.authService.certificate(res.user);
            case 1:
                return {
                    code: 600,
                    message: '账号或密码不正确'
                }
            case 2: 
                return {
                    code: 600,
                    message: res.message
                }
        }
    }

    //注册
    @Post('register')
    async register(@Body() body) {
        if (!body.username || !body.password) {
            throw new HttpException({
                message: '用户名或密码不能为空'
            }, HttpStatus.BAD_REQUEST)
        }
        return await this.userService.register(body)
    }


    @Get()
    async current(@Request() req): Promise<Result> {
        const { username } = req.user
        const user = await this.userService.getCurrentUser(username)
        if (!user) {
            throw new HttpException({
                message: '未查找到该用户'
            }, HttpStatus.BAD_REQUEST)
        } else {
            return {
                code: 0,
                msg: 'success',
                data: user
            }
        }
    }

    //更新
    @Put()
    update(@Body() body, @Request() req) {
        return this.userService.update(body, req.user)
    }
    
    //注销
    @Post('logout')
    loginout() {

    }
}
