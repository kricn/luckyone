import API from '../utils/request.js';

//获取列表
export function getArticleList (data) {
    return new Promise((resolve, reject) => {
        API.request({
            url: `/admin/article`,
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