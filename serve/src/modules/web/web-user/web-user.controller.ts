import { Controller, Get, Query } from '@nestjs/common';
import { WebUserService } from './web-user.service'

@Controller('web/user')
export class WebUserController {

  constructor(
    private readonly webUserService: WebUserService
) {}

  @Get()
  async getCurrent(@Query('username') username: string) {
    return await this.webUserService.getUser(username)
  }

}
