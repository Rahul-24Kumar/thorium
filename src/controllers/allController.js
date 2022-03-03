const authorModel = require("../models/newAuthor")
const bookModel= require("../models/bookModel")



// const createUser= async function (req, res) {
//     let data= req.body
//     let savedData= await UserModel.create(data)
//     res.send({msg: savedData})
// }

// const getUsersData= async function (req, res) {
//     let allUsers= await UserModel.find()
//     res.send({msg: allUsers})
// }

//today
const createNewAuthor= async function (req, res) {
    const reqAuthor= req.body
    const savedData= await authorModel.create(reqAuthor)
    res.send({msg: savedData})
}

const createNewBook= async function (req, res) {
    const reqBook= req.body
    const savedData= await bookModel.create(reqBook)
    res.send({msg: savedData})
}

const allBooks= async function (req, res) {
    const authorDetails = await authorModel.find({author_name: "Chetan Bhagat"})
    const id = authorDetails[0].author_id
    const booksName = await bookModel.find({author_id: id}).select({name:1})
    res.send({msg: booksName})
}

const updateBookPrice= async function (req, res) {
    const bookDetails = await bookModel.find({name: "Two states"})
    const id = bookDetails[0].author_id
    const authorN = await authorModel.find({author_id:id}).select({author_name:1, _id:0})

    const bkname = bookDetails[0].name
    const updatedPrice = await bookModel.findOneAndUpdate({name: bkname},{price: 100},{new:true}).select({price:1, _id:0})
    res.send({msg: authorN, updatedPrice})
}

const authorsName= async function (req, res) {
    const booksId= await bookModel.find({price: {$gte:50, $lte:100}}).select({author_id:1, _id:0})
    const id = booksId.map(inp => inp.author_id)
    
    // const allAuthorNames= id.map{x => {
    //     return authorModel.find({author_id:x}).select({author_name:1, _id:0})
    // }
    // res.send({msg: allAuthorNames})

let temp = []
for(let i=0; i<id.length; i++) {
    let x = id[i]
    const author = await authorModel.find({author_id:x}).select({author_name:1, _id:0})
    temp.push(author)
}

const authorName = temp.flat()

res.send({msg: authorName})

}
//today

module.exports.createNewAuthor= createNewAuthor
module.exports.createNewBook= createNewBook
module.exports.allBooks= allBooks
module.exports.updateBookPrice= updateBookPrice
module.exports.authorsName= authorsName