import { Body, Controller, Delete, Get, Post, Query, UsePipes } from '@nestjs/common';
import { TagsService } from './tags.service';
import { ValidationPipe } from 'src/common/pipe/validation.pipe';

import { TagsAddDTO } from './dto/tags.add.dto'



@Controller('admin/tags')
export class TagsController {
    constructor(
        private readonly tagsService: TagsService
    ) {}
    
    //添加标签
    /**
     * 
     * @param body { name: string }
     */
    @Post()
    @UsePipes(ValidationPipe)
    async addTags(@Body() body: TagsAddDTO) {
        const { name } = body
        return await this.tagsService.addTags(name)
    }

    //查找标签
    /**
     * 
     * @param query {id: string } 通过,连接id
     */
    @Get()
    async findTagsById(@Query() query: { id: string}) {
        const { id } = query
        return this.tagsService.findTagsById(id)
    }

    //删除标签
    /**
     * 
     * @param query {id: string } 通过,连接id
     */
    @Delete()
    async deleteTags(@Query() query: { id: string }) {
        const { id } = query
        return this.tagsService.deleteTags(id)
    }

    @Get('/ban')
    async banTags(@Query() query: { id: string }) {
        const { id } = query
        return this.tagsService.banTags(id)
    }
}
