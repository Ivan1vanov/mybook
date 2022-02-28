import { User } from "../models/userModel.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const signUpControler = async (req, res) => {
    const {firstName, lastName, email, password} = req.body
    try {
        const user = await User.findOne({email})

        if(user) {
            res.status(400).json({message: 'user allready exists'})
        } else {

            const hashPassword = await bcrypt.hash(password, 7)

            const newUser = new User({email: email, password: hashPassword, name: `${firstName} ${lastName}`})

            await newUser.save()

            const token = jwt.sign({email: newUser.email, id: newUser._id}, 'fvckY0u', {expiresIn: '1d'})

            res.status(201).json({response: {result: newUser, token}}) 
        }


    } catch (error) {
        res.status(400).json({message: 'Invalid credentials'})
    }
}

export const signInControler = async (req, res) => {
    const {email, password} = req.body
    try {

        const user = await User.findOne({email})

        if(user) {

            const isPassword = await bcrypt.compare(password, user.password)

            if(isPassword) {
                
                const token = jwt.sign({email: user.email, id: user._id}, 'fvckY0u', {expiresIn: '1d'})

                res.status(200).json({response: {result: user, token}})
            }

        } else {
            res.status(400).json({message: 'User does not exists'})
        }

    } catch (error) {
        res.status(400).json({message: 'Invalid credentials'})
    }
}

export const getCurrentUserControler = async (req, res) => {
    const {id} = req.params
    try {
        
        const user = await User.findById(id)

        res.status(200).json({user: user})

    } catch (error) {
        console.log(error)
    }
} 


export const getAllUsersControler = async (req, res) => {
    try {
         
    const users = await User.find()
    res.status(200).json(users) 

    } catch (error) {
        console.log(error)
    }
}

export const searchUsersControler = async (req, res) => {
    const {name} = req.query
    try {
        const userName = RegExp(name, 'i')
        const users = await User.find({name: userName})

        res.status(200).json(users)

    } catch (error) {
        console.log(error)
    }   
}

export const uploadAvatarControler = async (req, res) => {
        const {id} = req.params
        const {userAvatar} = req.body
    try { 
        const user = await User.findByIdAndUpdate(id, {avatar: userAvatar}, {new: true})
 
        // const user = await User.findOne
        res.status(200).json(user)
    } catch (error) { 
        console.log(error)
    }
}