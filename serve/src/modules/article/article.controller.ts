import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ArticleService } from './article.service'
import { ArticleAddDTO } from './dto/article.add.dto'

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService){}

    @Get()
    getArticle(@Query() query) {
        return '获取成功'
    }

    @Get('/:id')
    getArticleDetail(@Param() param) {
        return '获取成功'
    }

    @Post()
    async addArticle(@Body() body) {
        // const { title, content, summary, cover, words } = body
        return await this.articleService.addArticle(body)
        return '添加成功'
    }

    @Put('/:id')
    modifyArticle(@Body() body) {
        return '修改成功'
    }

    @Post('/draf')
    addDraf(@Body() body) {
        return '保存成功'
    }

    @Put('/draf')
    modifyDraf(@Body() body) {
        return '修改成功'
    }
}
