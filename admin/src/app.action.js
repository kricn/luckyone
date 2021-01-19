const login = (state, payload) => {
    return Object.assign({}, state, {
        isAuth: payload
    })
}

const setUser = (state, payload) => {
    let newState =  Object.assign({}, state)
    newState.user = Object.assign({}, newState.user, payload)
    return newState
}

export {
    login,
    setUser
}