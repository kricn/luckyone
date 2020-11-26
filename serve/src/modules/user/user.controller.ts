import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NoAuth } from 'src/common/decorator/noAuth';
import { AuthService } from '../auth/auth.service';
import { UserLoginDto } from './dto/user.login.dto';
import { UserService } from './user.service'

const userQuery = ['username', 'id']

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

    @Post('/login')
    async login(@Body() req) {
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


    @Get()
    async findAll(@Query() q) {
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

    @Put()
    update(@Body() body) {
        return this.userService.update(body)
    }
}
