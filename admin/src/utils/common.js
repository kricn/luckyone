import { getCurrent } from '@/api/account'
import store from '@/store'

const deepCopy = obj => {
    if (typeof obj == "object") {
        //复杂数据类型
        var result= Array.isArray(obj) ? [] : {};
        for (let i in obj) {
            result[i] = typeof obj[i] == "object" ? deepCopy(obj[i]) : obj[i];
        }
        return result;
    } else {
        //简单数据类型 直接赋值
        return obj;
    }
}

const getCurrentUser = () => {
    getCurrent().then(res => {
        store.dispatch({type: 'SETUSER', payload: res.data})
    }).catch(err => {
        console.log(err)
    })
}

export {
    deepCopy,
    getCurrentUser
}