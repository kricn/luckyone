import {  setUser } from './app.action'

const initState = {
    list: [],
    user: null
}

const appReducer = (state = initState, action) => {
    const { type, payload } = action
    switch (type) {
        case 'LOGIN':
            return state
        case 'SETUSER':
            return setUser(state, payload)
        default:
            return state
    }
}

export default appReducer