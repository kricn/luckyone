import { getToken } from './session.js'

const filterRoute = routes => {
    return routes.filter(item => {
        const { meta } = item
        //没有meta表示公共页面
        if (!meta) return true
        //判断需要权限
        if (meta.auth && getToken('token')) {
            return true
        } else {
            return false
        }
    })
}

const renderRouter = route => {
    
}

export {
    renderRouter,
    filterRoute
}