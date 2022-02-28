import axios from "axios";

const API = axios.create({baseURL: 'http://localhost:5000/'})

export const getUsersAPI = () => API.get('/api/users/')
export const userSignUpAPI = (userData) => API.post('/api/users/signup/', userData)
export const userSignInAPI = (userData) => API.post('/api/users/signin/', userData)
export const getCurretnUserAPI = (id) => API.get(`/api/users/user/${id}`)
export const searchUsersAPI = (name) => API.get(`/api/users/search?name=${name}`)

export const uploadAvatarAPI = (id, userAvatar) => API.put(`/api/users/avatar/${id}`, userAvatar)