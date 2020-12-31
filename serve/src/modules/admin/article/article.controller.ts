import { Body, Controller, Get, Param, Post, Put, Query, UsePipes, Request, Req } from '@nestjs/common';
import { ValidationPipe } from 'src/common/pipe/validation.pipe';
import { ArticleService } from './article.service'
import { ArticleAddDTO } from './dto/article.add.dto'

@Controller('admin/article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService){}

    @Get()
    getArticle(@Query() query, @Request() req) {
        query.user = req.user
        return this.articleService.getArticleList(query)
    }

    @Get('/:id')
    async getArticleDetail(@Param() param: {id: string, user?: any}, @Request() req) {
        param.user = req.user
        return await this.articleService.getArticleDetail(param)
    }

    @Post()
    @UsePipes(ValidationPipe)
    async addArticle(@Body() body: ArticleAddDTO, @Request() req) {
        body.user = Object.assign({}, req.user)
        return await this.articleService.addArticle(body)
    }

    @Put('/:id')
    modifyArticle(@Param() param: {id: string}, @Body() body: ArticleAddDTO) {
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
