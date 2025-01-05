const express = require("express")
const router = express.Router()
const postController = require("../controllers/postController")

router.post("/",postController.createPost)
router.get("/", postController.readPosts)
// router.get("/:id", postController.readPostById)
router.get("/:title", postController.readPostByTitle)
router.put("/", postController.updatePost)
router.delete("/", postController.deletePost)



module.exports = router