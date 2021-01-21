import API from '../utils/request.js';

//登录
export function Login (data) {
    return new Promise((resolve, reject) => {
        API.request({
            url: `/admin/user/login`,
            method: 'POST',
            data
        }).then(res => {
            const data = res.data
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
} 

//注册
export function Register (data) {
    return new Promise((resolve, reject) => {
        API.request({
            url: `/admin/user/register`,
            method: 'POST',
            data
        }).then(res => {
            const data = res.data
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

//获取当前用户
export function getCurrent () {
    return new Promise((resolve, reject) => {
        API.request({
            url: `/admin/user`,
            method: 'GET'
        }).then(res => {
            const data = res.data
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
} 

//更新用户信息
export function updateCount (data) {
    return new Promise((resolve, reject) => {
        API.request({
            url: `/admin/user`,
            method: 'PUT',
            data
        }).then(res => {
            const data = res.data
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}