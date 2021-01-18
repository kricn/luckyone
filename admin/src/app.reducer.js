import { login } from './app.action'

const initState = {
    isAuth: sessionStorage.getItem('isAuth') || '0',
    list: []
}

const appReducer = (state = initState, action) => {
    const { type, payload } = action
    switch (type) {
        case 'LOGIN':
            sessionStorage.setItem('isAuth', payload)
            console.log(login(state, payload))
            return login(state, payload)
        case 'GETLIST':
            return Object.assign({}, state, {list: payload})
        default:
            return state
    }
}

export default appReducer