import { applyMiddleware, combineReducers, createStore } from 'redux';
import appReducer from '@/app.reducer.js';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import rdPromise from 'redux-promise';

const countReducer = (state = 0, action) => {
    const {type, payload} = action
    switch(type) {
        case 'ADD':
            return state + payload;
        case 'MINUS':
            return state - payload;
        default:
            return state
    }
}

const totalReducer = {
    appReducer,
    countReducer
}

const store = createStore(
    combineReducers(totalReducer),
    applyMiddleware(thunk, logger, rdPromise)
)

export default store