import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {

    async uploads(file) {
        return {
            filename: file.filename,
            path: `/upload/${file.filename}`
        }
    }
}
