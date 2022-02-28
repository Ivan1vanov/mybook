import {combineReducers, createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { conversationReducer } from './reducers/conversationReducer'
import { postReducer } from './reducers/postReucer'
import { userReducer } from './reducers/userReducer'


const reducers = combineReducers({
    posts: postReducer,
    user: userReducer,
    dialogs: conversationReducer
})

export const store = createStore(reducers, compose(applyMiddleware(thunk)))