const express = require("express")
const router = express.Router()
const todoController = require("../controllers/todoController")

router.post("/",todoController.createTodo)
router.get("/", todoController.readTodo)
router.get("/:title", todoController.readTodoByTitle)
router.put("/", todoController.updateTodo)
router.delete("/", todoController.deleteTodo)


module.exports = router