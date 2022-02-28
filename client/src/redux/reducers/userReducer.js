import { AUTH, GET_CURRENT_USER, GET_USERS, LOGOUT, SEARCH_USERS } from "../constants/userConstants";


export const userReducer = (state = {auth: []}, action) => {
    switch (action.type) {
        case AUTH:
        localStorage.setItem('profile', JSON.stringify(action.payload.response))
        return {auth: action.payload.response}
        case LOGOUT:
        localStorage.clear()
        return {auth: []}
        case GET_CURRENT_USER:
        return {...state, user: action.payload.user && action.payload.user}
        case GET_USERS:
        return {...state, users: action.payload}
        case SEARCH_USERS:
            return {...state, users: action.payload}
        default:
            return state
    }
} 