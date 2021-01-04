import * as fs from 'fs';
import { join } from 'path'

export const writeImage = function (source: string, target: string): Promise<string> {
    return new Promise((resolve, reject) => {
        //静态文件目录
        let root = join(__dirname, '..', process.env.STATIC_ROOT)
        //判断文件夹是否存在
        if (!fs.existsSync(root + target)) {
            fs.mkdir(root + target, { recursive: true }, (err) => {
                if (err) throw err;
            });
        }
        
        source = root + source
        let filename = source.split("/").slice(-1)
        let target_path = target + `/${filename}`
        try {

            if (!fs.existsSync(source)) {
                resolve('')
                return false;
            }

            const reader = fs.createReadStream(source)
            const writer = fs.createWriteStream(root + target_path)
            reader.pipe(writer)
                .on('finish', () => {
                    resolve(target_path)
                })
                .on('error', err => {
                    reject(""+err)
                })
        }catch(err) {
            reject(""+err)
        }
    })
}
