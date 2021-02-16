import { Controller, Get, Query, Param } from '@nestjs/common';
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
    @Get('/tags')
    async getTags() {
        return this.webArticleService.getTags()
    }
    @Get('/:id')
    async getArticleDetail(@Param('id') id) {
        return await this.webArticleService.getArticleDetail(id)
    }
}
