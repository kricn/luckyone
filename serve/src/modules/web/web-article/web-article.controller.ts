import { Controller, Get, Query } from '@nestjs/common';
import { resourceLimits } from 'worker_threads';
import { WebArticleService } from './web-article.service'

@Controller('web/article')
export class WebArticleController {
    constructor(
        private readonly webArticleService: WebArticleService
    ) {}

    @Get()
    async getArticleList(
        @Query() query, 
        @Query('offset') offset,
        @Query('limit') limit,
        @Query('sort') sort
    ) {
        return this.webArticleService.getArticleList(query, offset, limit, sort)
    }
}
