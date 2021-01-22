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
// 切换文章状态
export function switchArticleStatus (data) {
    return new Promise((resolve, reject) => {
        API.request({
            url: `/admin/article/switch_status/${data.id}`,
            method: 'PUT',
            data: data.data
        }).then(res => {
            const data = res && res.data
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

// 上传图片
export function uploadImg (data) {
    return new Promise((resolve, reject) => {
        API.request({
            url: `/admin/upload/article`,
            method: 'POST',
            data: data
        }).then(res => {
            const data = res && res.data
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

// 添加文章
export function addArticle (data) {
    return new Promise((resolve, reject) => {
        API.request({
            url: `/admin/article`,
            method: 'POST',
            data: data
        }).then(res => {
            const data = res && res.data
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

// 修改文章
export function editArticle (data) {
    return new Promise((resolve, reject) => {
        API.request({
            url: `/admin/article/${data.id}`,
            method: 'PUT',
            data: data.data
        }).then(res => {
            const data = res && res.data
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

// 获取文章详情
export function getArticleDetail (data) {
    return new Promise((resolve, reject) => {
        API.request({
            url: `/admin/article/${data}`,
            method: 'GET'
        }).then(res => {
            const data = res && res.data
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}