import { Post } from "../models/postModel.js"




export const createPostControler = async (req, res) => {
    const post = req.body
    try {
        if(req.userId) {
            const newPost = new Post({...post, creator: req.userId})
            await newPost.save()
            res.status(201).json(newPost)
        } else {
            res.status(400).json({message: 'Unauthenticated'})
        }
         
    } catch (error) {
        console.log(error)
    }
}

export const getPostsControler = async (req, res) => {
    const {page} = req.query
    try {

        const LIMIT = 5
        const startIndex = (Number(page) - 1) * LIMIT
        const total = await Post.countDocuments() 

        const posts = await Post.find().sort({_id: -1}).limit(LIMIT).skip(startIndex)
        res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)})
    } catch (error) {
        console.log(error)
    }
}

export const updatePostControler = async (req, res) => {
    const post = req.body
    const {id} = req.params
    try {
        const updatedPost = await Post.findByIdAndUpdate(id, post, {new: true})
        res.status(200).json(updatedPost)

    } catch (error) {
        console.log(error)
    }
}

export const deletePostControler = async (req, res) => {
    const {id} = req.params
    try {
        
        const deletedPost = await Post.findByIdAndDelete(id)

        res.status(200).json(deletedPost)

    } catch (error) {
        console.log(error)
    }
}

export const likePostControler = async (req, res) => {
    const {id} = req.params
    try {
        if(!req.userId) {
            res.status(400).json({message: 'Unauthenticated'})
        } else {
            const post = await Post.findById(id)
            const index = await post.likes.findIndex(id => id === String(req.userId))

            if(index === -1) {
                post.likes.push(req.userId)
            } else {
                post.likes = post.likes.filter(id => id !== String(req.userId))
            }

            const updatedPost = await Post.findByIdAndUpdate(id, post, {new: true})

            res.status(201).json(updatedPost)
        }
    } catch (error) {
        console.log(error)
    }
}

export const searchPostsControler = async (req, res) => {
    const {tags, postSearch} = req.query
    try {

        const tagsExp = RegExp(tags, 'i')
        const postExp = RegExp(postSearch, 'i')
 
        const posts = await Post.find({ text: postExp, tags: tagsExp})

        res.status(200).json({data: posts})
        
    } catch (error) {
        console.log(error)
    }
}

export const getPostDetailsControler = async (req, res) => {
    const {id} = req.params
    try {
        const post = await Post.findById(id)

        res.status(200).json({post: post})
    } catch (error) {
        console.log(error)
    }
}

export const commentPostControler = async (req, res) => {
    const {id} = req.params
    const {comment} = req.body
    try { 
        
        const post = await Post.findById(id)
        await post.comments.push(comment)

        const commentedPost = await Post.findByIdAndUpdate(id, post, {new: true})

        res.status(201).json(commentedPost)

    } catch (error) {
        console.log(error)
    }
} 

export const getUsersPostsControler = async (req, res) => {
    const {id} = req.params
    const {page} = req.query
    try {

        const LIMIT = 2
        const startIndex = (Number(page) - 1) * LIMIT
        const total = await Post.find({creator: id}).countDocuments()

        const posts = await Post.find({creator: id}).sort({_id: -1}).limit(LIMIT).skip(startIndex)
        res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)})
    } catch (error) {
        console.log(error)
    }
}

