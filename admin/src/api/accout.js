import API from '../../src/utils/request.js';

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