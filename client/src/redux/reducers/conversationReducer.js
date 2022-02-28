import { CREATE_CONVERSATION, CREATE_MESSAGE, GET_CONVERSATIONS, GET_CURRENT_CHAT } from "../constants/conversationAction";


export const conversationReducer = (state = {conversations: []}, action) => {
    switch (action.type) {
        case GET_CONVERSATIONS:
            return {...state, conversations: action.payload}
        case GET_CURRENT_CHAT:
            return {...state, userChat: action.payload}
        case CREATE_MESSAGE:  
            return {...state, userChat: [...state.userChat, action.payload]}
        case CREATE_CONVERSATION:
            return  {...state, conversations: [...state.conversations, action.payload]}
        default:
            return state
    }
}