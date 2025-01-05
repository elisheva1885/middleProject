
const Todo = require("../models/Todo")

const createTodo = async (req, res) => {
    const { title, tags } = req.body
    if (!title) {
        return res.status(400).json({ message: "title is required" })
    }
    const todo = await Todo.create({ title, tags })
    if (todo) {
        const todos = await Todo.find().lean()
        res.status(200).json(todos)

    }
    else {
       
        return res.status(400).json({ message: "invalid post" })
    }
}

const readTodo = async (req, res) => {
    const todo = await Todo.find().lean()
    if(!todo?.length)
        return res.status(400).json({ message: "no todos found" })
    res.status(200).json(todo)

}

const readTodoByTitle = async (req,res) => {
    const {title} =req.params
    if(!title)
        {
            return res.status(400).json({ message: "no such todo" })
        }
    const todo = await Todo.find({title : title}).lean()
    if(!todo)
           return res.status(400).json({ message: "no such todo" })

    res.status(200).json(todo)
}

const updateTodo = async (req,res) => {
    const { _id,title, tags , completed } = req.body

    if(!_id || !title)
        return res.status(400).json({ message: "invalid fields" })
    const todo = await Todo.findById(_id).exec()
    if(!todo)
        return res.status(400).json({ message: "no such todo" })

    todo.title = title
    todo.tags = tags
    todo.completed = completed
    const updatedTodo = await todo.save()
    // res.json(`${updatedTodo.title} updated`)
    const todos = await Todo.find().lean()
    res.status(200).json(todos)

}

const deleteTodo = async (req,res)=> {
    const {_id} = req.body

    const todo = await Todo.findById(_id).exec()
    if(!todo){
        return res.status(400).json({ message: "todo not found" })
    }
    const result = await todo.deleteOne()
    // const reply = `Post ${todo.title} ID ${todo._id} deleted`
    const todos = await Todo.find().lean()
    res.status(200).json(todos)

}

module.exports = { createTodo , readTodo, readTodoByTitle, updateTodo, deleteTodo}