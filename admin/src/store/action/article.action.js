const setArticleList = (state, payload) => {
    return Object.assign({}, state, {
        list: [...payload]
    })
}

export {
    setArticleList
}