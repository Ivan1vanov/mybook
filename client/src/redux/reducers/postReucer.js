import { CREATE_POST, DELETE_POST, GET_POSTS, GET_POSTS_BY_SEARCH, GET_POST_DETAILS, LIKE_POST, UPDATA_POST, COMMENT_POST } from "../constants/postConstants";


export const postReducer = (state = [], action) => {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload.data,
                numberOfPages: action.payload.numberOfPages,
                currentPage: action.payload.currentPage
            }
        case CREATE_POST: 
            return {
                ...state.posts, posts: [...state.posts, action.payload]
            }
        case DELETE_POST: 
        return {
            ...state, posts: state.posts.filter(p => p._id !== action.payload._id)
        }
        case UPDATA_POST: 
            return{
                ...state, posts: state.posts.map(p => p._id === action.payload._id ? action.payload : p)
            }
        case LIKE_POST: 
            return {
                ...state, posts: state.posts.map(p => p._id === action.payload._id ? action.payload : p)
            }
        case GET_POSTS_BY_SEARCH:
            return {
                ...state, posts: action.payload.data
            }
        case GET_POST_DETAILS:
            return {
                ...state, post: action.payload.post
            }
        case COMMENT_POST: 
        return {
            ...state,
            posts: state.posts.map((post) => {
              if (post._id == +action.payload._id) {
                return action.payload;
              }
              return post;
            }),
          };
        default:
            return state
    }
}