import axios from 'axios';

import { Message } from 'antd'

import { getToken } from '@/utils/session.js'

import store from '@/store'

const API = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 15000
})

API.interceptors.request.use(config => {
    const token = getToken('token')
    if (token) {
        config.headers.token = token
    }
    
    return config
}, err => {
    
    return Promise.reject(err)
})

API.interceptors.response.use(response => {

    const data = response.data
    if (data.code && data.code !== 0) {
        Message.error(data.message)
    }
    return response
}, err => {
    const statusCode = err.response.data.statusCode
    const data = err.response.data
    if (statusCode === 401) {
        Message.error(data.message)
        store.dispatch({type: 'LOGIN', payload: false})
        return ;
    }
    return Promise.reject(err)
})

export default API;