import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
    conversationId: String,
    sender: String,
    text: String 
}, {timestamps: true})

export const Message = mongoose.model('Message', messageSchema)