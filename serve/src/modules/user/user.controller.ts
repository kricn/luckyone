import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service'

const userQuery = ['username', 'id']

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll(@Query() q) {
        let query = {}
        userQuery.forEach(item => {
            if (q[item]) {
                query[item] = q[item]
            }
        })
        return this.userService.find(query)
    }

    // @Get()
    // find(@Query('id') id) {
    //     if (!id) {
    //         return this.userService.find()
    //     }
    //     return this.userService.find(id)
    // }

    @Post()
    register(@Body() req) {
        this.userService.register(req)
        return 'ok'
    }
}
