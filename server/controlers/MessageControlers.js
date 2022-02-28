import { Message } from "../models/messageModel.js"


export const createMessageControler = async (req, res) => {
    const messageData = req.body
    try { 
        const message = new Message(messageData)
        const newMessage = await message.save()
        res.status(200).json(newMessage)
    } catch (error) {
        console.log(error)  
    }
}

export const getMessageControler = async (req, res) => {
        const {dialogId} = req.params
    try {
        
        const message = await Message.find({
            conversationId: dialogId
        })

        res.status(200).json(message)

    } catch (error) {
        console.log(error)
    }
}