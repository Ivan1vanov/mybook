import express from 'express'
import { getAllUsersControler, getCurrentUserControler, searchUsersControler, signInControler, signUpControler, uploadAvatarControler } from '../controlers/userControlers.js'

const userRouter = express.Router()

userRouter.post('/signup', signUpControler)
userRouter.post('/signin', signInControler)

userRouter.put('/avatar/:id', uploadAvatarControler)

userRouter.get('/user/:id', getCurrentUserControler) 
userRouter.get('/', getAllUsersControler) 
userRouter.get('/search', searchUsersControler)

export default userRouter