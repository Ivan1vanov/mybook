import axios from "axios";

const API = axios.create({baseURL: 'https://ivansbook.herokuapp.com/'})

export const getConversationsAPI = (id) => API.get(`/api/conversations/${id}`)
export const getCurrentChatAPI = (id) => API.get(`/api/messages/${id}`)
export const createMessageAPI = (messageData) => API.post(`/api/messages/`, messageData)
export const createConversationAPI = (usersId) => API.post('/api/conversations/', usersId)