import { applyMiddleware, combineReducers, createStore } from 'redux';
import appReducer from '@/app.reducer.js';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import rdPromise from 'redux-promise';

const totalReducer = {
    appReducer
}

const store = createStore(
    combineReducers(totalReducer),
    applyMiddleware(thunk, logger, rdPromise)
)

export default store