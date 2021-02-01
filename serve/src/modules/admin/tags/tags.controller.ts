import { Body, Controller, Delete, Get, Post, Query, UsePipes, Put, Param, Request, Req } from '@nestjs/common';
import { TagsService } from './tags.service';
import { ValidationPipe } from 'src/common/pipe/validation.pipe';

import { TagsAddDTO } from './dto/tags.add.dto'



@Controller('admin/tags')
export class TagsController {
    constructor(
        private readonly tagsService: TagsService
    ) {}
    
    @Post()
    @UsePipes(ValidationPipe)
    async addTags(@Body() body: TagsAddDTO, @Request() req) {
        const { name } = body
        const { user } = req
        return await this.tagsService.addTags(name, user)
    }

    //获取标签列表
    @Get()
    async getTagsList(@Query() query, @Request() req) {
        const { user } = req
        return this.tagsService.getTagsList(query, user)
    }

    @Delete()
    async deleteTags(@Body('id') id, @Request() req) {
        const { user } = req
        return this.tagsService.deleteTags(id, user)
    }

    //修改标签
    @Put('/:id')
    async updateTag(@Body() body: {name: string}, @Param('id') id: number, @Request() req) {
        const user = req.user
        const { name } = body
        return await this.tagsService.updatetag(id, name, user)
    }

    //切换标签状态
    @Put('/switch/:id')
    async swtichTagsStatus(@Body() body: { available: number }, @Param('id') id, @Request() req) {
        const user = req.user
        const { available } = body
        return this.tagsService.swtichTagsStatus(id, available, user)
    }
}
