import { Converstion } from "../models/conversationModel.js"


export const createConversationControler = async (req, res) => {
        const {senderId, receiverId} = req.body
    try {

        const conversation = new Converstion({
            members: [senderId, receiverId]
        })

        const newConversation = await conversation.save()

        res.status(201).json(newConversation)
    } catch (error) {
        console.log(error)
    }
}

export const getConversationControler = async (req, res) => {
    const {id} = req.params
    try {
        
        const userConversation = await Converstion.find({
            members: {$in: [id]}
        })

        res.status(200).json(userConversation)

    } catch (error) {
        console.log(error)
    }
}