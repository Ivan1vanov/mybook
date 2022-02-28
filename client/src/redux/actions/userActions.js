import * as api from '../../api/userAPI'
import { AUTH, GET_CURRENT_USER, GET_USERS, LOGOUT, SEARCH_USERS } from '../constants/userConstants'


export const signUpAction = (userData, navigate) => async dispatch => {
    try {
            const {data} = await api.userSignUpAPI(userData)
            // console.log(data)
            dispatch({type: AUTH, payload: data})
            navigate('/')
    } catch (error) {
        console.log(error.message)
    }
}

export const signInAction = (userData, navigate) => async dispatch => {
    try {
        const {data} = await api.userSignInAPI(userData)
        // console.log(data)
        dispatch({type: AUTH, payload: data})
        navigate('/')
    } catch (error) {
        console.log(error.message)
    }
}

export const logoutAction = (navigate) => async dispatch => {
    dispatch({type: LOGOUT})
    navigate('/auth')
}

export const getCurretuserAction = (id) => async dispatch => { 
    try {
        
        const {data} = await api.getCurretnUserAPI(id)
        // console.log(data)
        dispatch({type: GET_CURRENT_USER, payload: data})

    } catch (error) {
        console.log(error)
    }
}

export const getAllUsersAction = () => async dispatch => {
    try { 
        
        const {data} = await api.getUsersAPI()
        // console.log(data)
        dispatch({type: GET_USERS, payload: data})
    } catch (error) {
        console.log()
    }
}

export const searchUsersAction = (name) => async dispatch => {
    try {
        
        const {data} = await api.searchUsersAPI(name)

        dispatch({type: SEARCH_USERS, payload: data})

    } catch (error) {
        console.log(error)
    }
}


export const uploadAvatarAction = (id, avatar) => async dispatch => {
    try {
        const {data} = await api.uploadAvatarAPI(id, avatar)
        // console.log(data)
    } catch (error) {
        console.log(error)
    }
}