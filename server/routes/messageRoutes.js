import express from 'express'
import { createMessageControler, getMessageControler } from '../controlers/MessageControlers.js'

const messageRouter = express.Router()

messageRouter.post('/', createMessageControler)
messageRouter.get('/:dialogId', getMessageControler)

export default messageRouter