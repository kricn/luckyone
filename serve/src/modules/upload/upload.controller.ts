import { Controller, Post, UseInterceptors ,UploadedFile, Body, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service'

@Controller('article/upload')
export class UploadController {
    constructor(
        private readonly uploadService: UploadService,
    ){}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async UploadedFile(@UploadedFile() file) {
        return this.uploadService.uploads(file)
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
            console.log(file)
            res.data.push({
                name: file.originalname,
                ...await this.uploadService.uploads(file)
            })
        })
        return res
    }
}
