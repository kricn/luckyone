import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll(@Query() query) {
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
