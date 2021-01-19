import { login, setUser } from './app.action'
import { setAuth, getAuth } from '@/utils/session'

const initState = {
    isAuth: getAuth('isAuth') || '0',
    list: [],
    user: {}
}

const appReducer = (state = initState, action) => {
    const { type, payload } = action
    switch (type) {
        case 'LOGIN':
            setAuth(payload)
            return login(state, payload)
        case 'GETLIST':
            return Object.assign({}, state, {list: payload})
        case 'SETUSER':
            return setUser(state, payload)
        default:
            return state
    }
}

export default appReducer