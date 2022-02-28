import express from 'express'
import { commentPostControler, createPostControler, deletePostControler, getPostDetailsControler, getPostsControler, getUsersPostsControler, likePostControler, searchPostsControler, updatePostControler } from '../controlers/postControlers.js'
import { auth } from '../middleware/auth.js'

const postRouter = express.Router()

postRouter.get('/', getPostsControler)
postRouter.get('/delails/:id', getPostDetailsControler)
postRouter.get('/search', searchPostsControler)
postRouter.get(`/userPosts/:id`, getUsersPostsControler)

postRouter.post('/', auth, createPostControler)

postRouter.put('/:id', updatePostControler)
postRouter.put('/likes/:id', auth, likePostControler)
postRouter.put('/comment/:id', commentPostControler)

postRouter.delete('/:id', deletePostControler)





export default postRouter