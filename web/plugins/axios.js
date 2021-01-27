export default function ({store, redirect, app: { $axios }})  {

    $axios.interceptors.request.use(config => {
        return config
    }, err => {
        
        return Promise.reject(err)
    })

    $axios.interceptors.response.use(response => {
        return response
    }, err => {
        return Promise.reject(err)
    })
}
