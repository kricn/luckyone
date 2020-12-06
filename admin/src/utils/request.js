import axios from 'axios';

import { Message } from 'antd'

const API = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 15000
})

API.interceptors.request.use(config => {
    
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

    return Promise.reject(err)
})

export default API;