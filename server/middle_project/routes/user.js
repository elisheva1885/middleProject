const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

router.post("/", userController.createUser)
router.get("/", userController.readUsers)
// router.get("/:id", userController.readUserById)
router.get("/:name", userController.readUserByName)

router.put("/", userController.updateUser)
router.delete("/", userController.deleteUser)


module.exports = router