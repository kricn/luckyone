import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import rdPromise from 'redux-promise';

// reducer
import appReducer from '@/app.reducer.js';
import articleReducer from './reducer/article.reducer'

const totalReducer = {
    appReducer,
    articleReducer
}

const store = createStore(
    combineReducers(totalReducer),
    applyMiddleware(thunk, logger, rdPromise)
)

export default store