import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Query, Request } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service'

const userQuery = ['username', 'id']

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
    async findAll(@Query() q, @Request() req) {
        let query = {}
        let res = []
        userQuery.forEach(item => {
            if (q[item]) {
                query[item] = q[item]
            }
        })
        const data = await this.userService.find({
            where: query,
            skip: q.skip,
            take: q.take
        })
        return data
    }

    @Get('/:username')
    async getUser(@Param() params) {
        return await this.userService.findUser(params.username)
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
