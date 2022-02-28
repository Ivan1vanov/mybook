import * as api from '../.././api/conversationsAPI'
import { CREATE_CONVERSATION, CREATE_MESSAGE, GET_CONVERSATIONS, GET_CURRENT_CHAT } from '../constants/conversationAction'

export const getConversationsAction = (id) => async dispatch => {
    try {
        const {data} = await api.getConversationsAPI(id)
        // console.log(data)
        dispatch({type: GET_CONVERSATIONS, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const getCurretChatAction = (id) => async dispatch => {
        try {
            
            const {data} = await api.getCurrentChatAPI(id)
            // console.log(data)
            dispatch({type: GET_CURRENT_CHAT, payload: data})

        } catch (error) {
            console.log(error)
        }
}

export const createMessageAction = (messageData) => async dispatch => {
        try {
            
            const {data} = await api.createMessageAPI(messageData)
            dispatch({type: CREATE_MESSAGE, payload: data})

        } catch (error) {
            console.log(error)
        }
}

export const createConversationAction = (usersId) => async dispatch => {
    try {
        const {data} = await api.createConversationAPI(usersId)
        dispatch({type: CREATE_CONVERSATION, payload: data})
    } catch (error) {
        console.log(error)
    }
}