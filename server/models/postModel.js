import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    text: String,
    image:  String,
    author: String, 
    creator: String, 
    tags: String,
    likes: [String],
    whatches: [],
    comments: [
        {
        commentCreator: String,
        creatorName: String,  
        comment: String 
    }
]
}, {timestamps: true})


export const Post = mongoose.model('Post', postSchema)