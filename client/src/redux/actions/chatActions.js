import * as api from '../.././api/conversationsAPI'
import { GET_CURRENT_CHAT } from '../constants/conversationAction'


export const getCurretChatAction = (id) => async dispatch => {
    try {
        
        const {data} = await api.getCurrentChatAPI(id)
        console.log(data)
        dispatch({type: GET_CURRENT_CHAT, payload: data})

    } catch (error) {
        console.log(error)
    }
}