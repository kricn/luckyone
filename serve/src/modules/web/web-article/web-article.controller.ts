import { Controller, Get } from '@nestjs/common';
import { WebArticleService } from './web-article.service'

@Controller('web/article')
export class WebArticleController {
    constructor(
        private readonly webArticleService: WebArticleService
    ) {}

    @Get()
    async getArticleList() {
        return this.webArticleService.getArticleList()
    }
}
