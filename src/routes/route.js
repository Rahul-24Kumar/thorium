const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
//const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})



//router.post("/createUser", UserController.createUser  )

//router.get("/getUsersData", UserController.getUsersData)



// router.get("/getBooksData", BookController.getBooksData)


// //today

// router.get("/getBooksInYear", BookController.getBooksInYear)
// router.get("/getBooksLists", BookController.getBooksLists)
// router.get("/getParticularBooks", BookController.getParticularBooks)
// router.get("/getXINRBooks", BookController.getXINRBooks)
// router.get("/getRandomBooks", BookController.getRandomBooks)

router.post("/createBook", BookController.createBook)
router.get("/getBooksData", BookController.getBooksData)
router.get("/getBooksLists", BookController.getBooksLists)
router.get("/getBooksInYear", BookController.getBooksInYear)
router.get("/getParticularBooks", BookController.getParticularBooks)
router.get("/getXINRBooks", BookController.getXINRBooks)
router.get("/getRandomBooks", BookController.getRandomBooks)

module.exports = router;