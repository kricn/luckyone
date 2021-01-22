import { Injectable } from '@nestjs/common';
import { writeImage } from '../../../utils/common'

@Injectable()
export class UploadService {

    async uploads(file) {
        return {
            filename: file.filename,
            path: `/upload/${file.filename}`
        }
    }

    async uploadArticle(file) {
        let imagesPath = '/article'
        const { filename } = file
        try {
            await writeImage(`/upload/${filename}`, imagesPath)
        } catch (e) {
            return {
                code: -1,
                message: '文件上传失败'
            }
        }
        return {
            code: 0,
            message: '上传成功',
            data: {
                filename,
                path: `/article/${filename}`
            }
        }
    }
}
