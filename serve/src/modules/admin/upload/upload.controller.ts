import { Controller, Post, UseInterceptors ,UploadedFile, Body, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service'

@Controller('/admin/upload')
export class UploadController {
    constructor(
        private readonly uploadService: UploadService,
    ){}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async UploadedFile(@UploadedFile() file) {
        return this.uploadService.uploads(file)
    }

    @Post('/article')
    @UseInterceptors(FileInterceptor('file'))
    async UploadedArticleFile(@UploadedFile() file) {
        return this.uploadService.uploadArticle(file)
    }
    
    @Post('/mutil')
    @UseInterceptors(FilesInterceptor('files'))
    async UploadedFiles(@UploadedFiles() files) {
        let res = {
            code: 0,
            message: 'success',
            data:[]
        }
        files.forEach(async file => {
            res.data.push({
                name: file.originalname,
                ...await this.uploadService.uploads(file)
            })
        })
        return res
    }
}
