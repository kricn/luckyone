import { setArticleList } from '../action/article.action'

const initState = {
    list: [],
}

const articleReducer = (state = initState, action) => {
    const { type, payload } = action
    switch (type) {
        case 'SET_ARTICLE_LIST':
            return setArticleList(state, payload)
        default:
            return state
    }
}

export default articleReducer