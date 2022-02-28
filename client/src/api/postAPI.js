import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:5000/'})

API.interceptors.request.use(req => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `ThisIsMyToken DontTouchIt FuckYou LastVarning IwillFindYou ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req
})

export const getPostsAPI = (page) => API.get(`/api/posts?page=${page}`)
export const createPostAPI = (post) => API.post(`/api/posts/`, post)
export const deletePostAPI = (id) => API.delete(`/api/posts/${id}`)
export const updatepostAPI = (id, post) => API.put(`/api/posts/${id}`, post)
export const likepostAPI = (postId) => API.put(`/api/posts/likes/${postId}`)
export const getPostDetailsAPI = (id) => API.get(`/api/posts/delails/${id}`)
export const commentPostAPI = (id, comment) => API.put(`/api/posts/comment/${id}`, { comment })

export const getPostsOfCurrentUseAPI = (creatorId, page) => API.get(`/api/posts/userPosts/${creatorId}?page=${page}`)

export const getPostsBySearchAPI = (searchData) => API.get(`api/posts/search?postSearch=${searchData.text}&tags=${searchData.tags}`)