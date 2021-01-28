import API from '../utils/request.js';

//获取列表
export function getTagsList (data) {
    return new Promise((resolve, reject) => {
        API.request({
            url: `/admin/tags`,
            method: 'GET',
            params: data
        }).then(res => {
            const data = res && res.data
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
} 