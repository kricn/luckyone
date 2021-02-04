
const setUser = (state, payload) => {
    let newState =  Object.assign({}, state)
    newState.user = payload
    return newState
}

export {
    setUser
}