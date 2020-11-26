import fs from 'fs';

const writeImage = function (source, target) {
    let filename = source.split("/").slice(-1)
    const reader = fs.createReadStream(source)
    const writer = fs.createWriteStream(target + `/${filename}`)
    return new Promise((resolve, reject) => {
        reader.pipe(writer)
            .on('finish', () => {
                resolve()
            })
            .on('error', () => {
                reject()
            })
    })
}

export {
    writeImage
}
