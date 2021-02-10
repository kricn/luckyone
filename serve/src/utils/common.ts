import * as fs from 'fs';
import { join } from 'path'

export const writeImage = function (source: string, target: string): Promise<string> {
    if(!source) {
        return null
    }
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

export function filterObject(obj, arr) {
    if (typeof obj !== 'object' || !Array.isArray(arr)) {
        throw new Error('参数格式错误')
    }
    const result = {}
    Object.keys(obj).filter(item => obj[item] && arr.includes(item)).forEach(i => {
        result[i] = obj[i]
    })
    return result
}
