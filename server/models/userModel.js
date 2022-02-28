import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    followers: {type: Array, default: []},
    avatar: {type: String, default: ''},
    images: [String]

}, {timestamps: true})

export const User = mongoose.model('User', userSchema) 