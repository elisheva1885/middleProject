
const User = require("../models/User")

const createUser = async (req, res) => {
    const { name, username, email, address, phone } = req.body
    if (!username) {
        return res.status(400).json({ message: "username is required" })
    }
    const user = await User.create({ name, username, email, address, phone })
    if (user) {
        const users = await User.find().lean()
        return res.status(200).json(users)

    }
    else {
       
        return res.status(400).json({ message: "invalid user" })
    }

}

const readUsers = async (req, res) => {
    const users = await User.find().lean()
    if(!users?.length)
        return res.status(400).json({ message: "no users found" })
    res.status(200).json(users)

}

const readUserById = async (req,res) => {
    const {_id} =req.params
    const user = await User.findById(_id).lean()
    if(!user)
        return res.status(400).json({ message: "no such user" })
    res.status(200).json(user)
}
const readUserByName = async (req,res) => {
    const {name} =req.params
    const user = await User.find({name: name}).lean()
    if(!user)
        return res.status(400).json({ message: "no such user" })
    res.status(200).json(user)
}

const updateUser = async (req,res) => {
    const { _id,name, username, email, address, phone } = req.body
    if(!_id || !username)
        return res.status(400).json({ message: "invalid fields" })
    const user = await User.findById(_id).exec()
    if(!user)
        return res.status(400).json({ message: "no such user" })

    user.name = name
    user.email = email
    user.address = address
    user.phone = phone

    const updatedUser = await user.save()
    const users = await User.find().lean()
    res.status(200).json(users)
    // res.json(`${updatedUser.username} updated`)
}

const deleteUser = async (req,res)=> {
    const {_id} = req.body
    const user = await User.findById(_id).exec()
    if(!user){
        return res.status(400).json({ message: "user not found" })
    }
    const result = await user.deleteOne()

    const reply = `User ${user.name} ID ${user._id} deleted`
    const users = await User.find().lean()
    return res.status(200).json(users)
}

module.exports = { createUser , readUsers, readUserById, updateUser, deleteUser, readUserByName}