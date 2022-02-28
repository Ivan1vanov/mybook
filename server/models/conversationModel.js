import mongoose from 'mongoose'

const conversationModel = mongoose.Schema({
    members: {
        type: [String]
    }
}, {timestamps: true})  

export const Converstion = mongoose.model('Conversation', conversationModel)