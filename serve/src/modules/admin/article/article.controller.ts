import { Body, Controller, Get, Param, Post, Put, Query, UsePipes, Request, Delete } from '@nestjs/common';
import { ValidationPipe } from 'src/common/pipe/validation.pipe';
import { ArticleService } from './article.service'

//dto
import { ArticleAddDTO } from './dto/article.add.dto'
import { ArticleGetDTO } from './dto/article.get.dto'

@Controller('admin/article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService){}

    //获取文章列表
    @Get()
    getArticle(
        @Query() query: ArticleGetDTO, 
        @Query('offset') offset: number,
        @Query('limit') limit: number,
        @Query('sort') sort: number,
        @Request() req
    ) {
        let user = req.user
        return this.articleService.getArticleList(user, query, offset, limit, sort)
    }

    //获取文章详情
    @Get('/:id')
    async getArticleDetail(@Param('id') id, @Request() req) {
        const user = req.user
        return await this.articleService.getArticleDetail(id, user)
    }

    //添加文章
    @Post()
    @UsePipes(ValidationPipe)
    async addArticle(@Body() body: ArticleAddDTO, @Request() req) {
        const user = req.user
        return await this.articleService.addArticle(body, user)
    }

    //切换文章状态
    @Put('/switch_status/:id')
    async switchArticleShow(@Param('id') id: number, @Body('status') status: number, @Request() req) {
        const user = req.user
        return await this.articleService.switchArticleList(id, status, user)
    }

    //删除文章
    @Delete('/:id')
    async deleteArticle(@Param('id') id: number, @Request() req) {
        const user = req.user
        return await this.articleService.deleteArticle(id, user)
    }

    //修改文章
    @Put('/:id')
    @UsePipes(ValidationPipe)
    async modifyArticle(@Param('id') id, @Body() body: ArticleAddDTO, @Request() req) {
        const user = req.user
        return await this.articleService.editArticle(body, id, user)
    }

    //保存草稿
    @Post('/draf')
    addDraf(@Body() body) {
        return '保存成功'
    }

    //修改草稿
    @Put('/draf')
    modifyDraf(@Body() body) {
        return '修改成功'
    }
}
