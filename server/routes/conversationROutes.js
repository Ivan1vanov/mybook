import express from 'express'
import { createConversationControler, getConversationControler } from '../controlers/ConversationControlers.js'

const conversationRouter = express.Router()

conversationRouter.post('/', createConversationControler)
conversationRouter.get('/:id', getConversationControler) 

export default conversationRouter