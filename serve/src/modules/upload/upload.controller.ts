import { Controller, Post, UseInterceptors ,UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service'

@Controller('upload')
export class UploadController {
    constructor(
        private readonly uploadService: UploadService,
    ){}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async UploadedFile(@UploadedFile() file) {
        return this.uploadService.uploads(file)
    }
}
