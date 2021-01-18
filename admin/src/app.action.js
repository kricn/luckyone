const login = (state, payload) => {
    return Object.assign({}, state, {
        isAuth: payload
    })
}

export {
    login
}