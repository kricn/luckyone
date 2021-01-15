
const initState = {
    isAuth: false
}

const appReducer = (state = initState, action) => {
    const { type, payload } = action
    switch (type) {
        case 'LOGIN':
            sessionStorage.setItem('isAuth', payload)
            return {
                ...state,
                isAuth: payload
            }
        default:
            return {
                ...state
            }
    }
}

export default appReducer