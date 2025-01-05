
const Post = require("../models/Post")

const createPost = async (req, res) => {
    const { title, body } = req.body
    if (!title) {
        return res.status(400).json({ message: "title is required" })
    }
    const post = await Post.create({ title, body })
    if (post) {
        const posts = await Post.find().lean()
        res.status(200).json(posts)
    }
    else {
       
        return res.status(400).json({ message: "invalid post" })
    }

}

const readPosts = async (req, res) => {
    const posts = await Post.find().lean()
    if(!posts?.length)
        return res.status(400).json({ message: "no posts found" })
    res.json(posts)

}

const readPostById = async (req,res) => {
    const {_id} =req.params
    const post = await Post.findById(_id).lean()
    if(!post)
        return res.status(400).json({ message: "no such post" })
    res.json(post)
}

const readPostByTitle = async (req,res) => {
    const {title} =req.params
    // if(!title){
    //     return res.status(400).json({ message: "no such post" })
    // }
    const post = await Post.find({title: title}).lean()
    if(!post){
        return res.status(400).json({ message: "no such post" })
    }
    res.status(200).json(post)
}

const updatePost = async (req,res) => {
    const { _id,title, body } = req.body
    if(!_id || !title)
        return res.status(400).json({ message: "invalid fields" })
    const post = await Post.findById(_id).exec()
    if(!post)
        return res.status(400).json({ message: "no such post" })

    post.title = title
    post.body = body
    const updatedPost = await post.save()
    const posts = await Post.find().lean()
    res.status(200).json(posts)
    // res.json(`${updatedPost.title} updated`)
}

const deletePost = async (req,res)=> {
    const {_id} = req.body
    const post = await Post.findById(_id).exec()
    if(!post){
        return res.status(400).json({ message: "post not found" })
    }
    const result = await post.deleteOne()

    const reply = `Post ${post.title} ID ${post._id} deleted`
    const posts = await Post.find().lean()
    res.status(200).json(posts)
   
}

module.exports = { createPost , readPosts, readPostById, updatePost, deletePost,readPostByTitle}