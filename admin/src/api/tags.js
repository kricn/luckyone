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

//添加
export function addTag (data) {
    return new Promise((resolve, reject) => {
        API.request({
            url: `/admin/tags`,
            method: 'POST',
            data
        }).then(res => {
            const data = res && res.data
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
} 

//修改
export function updateTag (data) {
    return new Promise((resolve, reject) => {
        API.request({
            url: `/admin/tags/${data.id}`,
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

//修改状态
export function switchTagsStatus (data) {
    return new Promise((resolve, reject) => {
        API.request({
            url: `/admin/tags/switch/${data.id}`,
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

//删除
export function deleteTag (data) {
    return new Promise((resolve, reject) => {
        API.request({
            url: `/admin/tags`,
            method: 'DELETE',
            data
        }).then(res => {
            const data = res && res.data
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}