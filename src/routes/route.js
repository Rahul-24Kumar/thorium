const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const auth = require("../middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser)

router.post("/login",  userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId", auth.authenticate , userController.getUserData)
router.post("/users/:userId/posts", auth.authorise ,userController.postMessage)

router.put("/users/:userId", auth.authenticate , userController.updateUser)
router.delete("/users/:userId", auth.authenticate , userController.deleteUser)

module.exports = router;