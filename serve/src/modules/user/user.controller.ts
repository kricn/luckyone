import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service'

const userQuery = ['username', 'id']

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

    // @Get()
    // findAll(@Query() q) {
    //     let query = {}
    //     userQuery.forEach(item => {
    //         if (q[item]) {
    //             query[item] = q[item]
    //         }
    //     })
    //     return this.userService.find(query)
    // }

    // @Get()
    // find(@Query('id') id) {
    //     if (!id) {
    //         return this.userService.find()
    //     }
    //     return this.userService.find(id)
    // }

    @Post('/login')
    async login(@Body() req) {
        console.log('JWT验证 - Step 1: 用户请求登录');
        const res = await this.authService.validateUser(req.username, req.password)
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

    @Post('register')
    async register(@Body() req) {
        return await this.userService.register(req)
    }
}
