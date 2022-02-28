import * as api from '../../api/postAPI'
import { COMMENT_POST, CREATE_POST, DELETE_POST, GET_POSTS, GET_POSTS_BY_SEARCH, GET_POST_DETAILS, LIKE_POST, UPDATA_POST } from '../constants/postConstants'

export const getPostsAction = (page) => async dispatch => {
    try {
        const {data} = await api.getPostsAPI(page)
        // console.log(data)
        dispatch({type: GET_POSTS, payload: data})

    } catch (error) {
        console.log(error)
    }
}

export const createPostAction = (post, navigate) => async dispatch => {
    try {
        const {data} = await api.createPostAPI(post)
        dispatch({type: CREATE_POST, payload: data})
        navigate(`/posts/${data._id}`)
    } catch (error) {
        console.log(error)
    }
}
 
export const deletePostAction = (id) => async dispatch => {
    try {
        const {data} = await api.deletePostAPI(id)
        dispatch({type: DELETE_POST, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const updatePostAction = (id, post) => async dispatch => {
    try {
        const {data} = await api.updatepostAPI(id, post)
        dispatch({type: UPDATA_POST, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const likePostAction = (postId) => async dispatch => {
    try {
        const {data} = await api.likepostAPI(postId)
        dispatch({type: LIKE_POST, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const getPostsBySearchAction = (searchData) => async dispatch => {
    try {
        const {data} = await api.getPostsBySearchAPI(searchData)
        // console.log(data)
        dispatch({type: GET_POSTS_BY_SEARCH, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const getPostDetailsAction = (id) => async dispatch => {
        try {
            
            const {data} = await api.getPostDetailsAPI(id)
            // console.log(data)
            dispatch({type: GET_POST_DETAILS, payload: data})

        } catch (error) {
            console.log(error)
        }
}

export const commentPostAction = (id, comment) => async dispatch => {
    try {
        
        const {data} = await api.commentPostAPI(id, comment)
        // console.log(data.comments)

        dispatch({type: COMMENT_POST, payload: data})
        
        return data.comments
    } catch (error) {
        console.log(error)
    }
}

export const getPostsOfCurrentUserAction = (id, page) => async dispatch => {
    try {
        
        const {data} = await api.getPostsOfCurrentUseAPI(id, page)

        dispatch({type: GET_POSTS, payload: data})

    } catch (error) {
        console.log(error)
    }
}