const { count } = require("console")
const mongoose = require("mongoose");
const newAuthorModel= require("../models/newAuthor")
const newBookModel= require("../models/newBook")
const newPublisherModel= require("../models/newPublisher")

const createAuthor= async function (req, res) {
    let newAuthor = req.body
    let savedAuthor = await new newAuthorModel(newAuthor).save()
    res.status(200).json(savedAuthor)
}

const createNewPublisher= async function (req, res) {
    let { name, author, price, ratings, publisher } = req.body
    if(!publisher) {
        res.status(400).json({msg: "publisher not present" })
    }
    const publisherInfo = await newPublisherModel.findById(publisher)
    if(!publisherInfo) {
        res.status(400).json({msg: "publisherId is required"})
    }

    const publisherCreated = await new newPublisherModel({
        name: name,
        author_id: author,
        price: price,
        ratings: ratings,
        publisher_id: publisher
    }).save()
    res.send({data: publisherCreated})
}

const createNewBook= async function (req, res) {
    let { name, author, price, ratings, publisher } = req.body
    if(!author) {
        res.status(400).json({msg: "author not present" })
    }
    const authorInfo = await newBookModel.findById(author)
    if(!authorInfo) {
        res.status(400).json({msg: "authorId is required"})
    }

    const authorCreated = await new newBookModel({
        name: name,
        author_id: author,
        price: price,
        ratings: ratings,
        publisher_id: publisher
    }).save()
    res.send({data: authorCreated})
}

    // const AuthorDetails= async function (req, res) {
    // let newAuthor = req.body
    // let savedAuthor = await AuthorDetails(newAuthor).save()
    // res.status(200).json(savedAuthor)
    const newAuthorDetails = async function (req, res) {
        let savedAuthor = await newBookModel.find().populate('author_id').populate('publisher_id');
        res.send({data: savedAuthor});
}

module.exports.createAuthor= createAuthor
module.exports.createNewPublisher= createNewPublisher
module.exports.createNewBook= createNewBook
module.exports.newAuthorDetails= newAuthorDetails


// const { count } = require("console")
// const authorModel = require("../models/authorModel.js")
// const bookModel= require("../models/bookModel.js")
// const publisherModel= require("../models/publisherModel.js")
// const mongoose = require("mongoose");


// const createBook= async function (req, res) {
//     let authorId = req.body.author_id
//     let publisherId = req.body.publisher_id
    
//     const authorDetails = await authorModel.findById(authorId)
//     const publisherDetails = await publisherModel.findById(publisherId)

//     if(req.body.hasOwnProperty("author_id")) {
//         if(authorDetails === undefined) {
//             return res.send({msg: "Author is not present"})
//         } else {
//             if(req.body.hasOwnProperty("publisher_id")) {
//                 if(publisherDetails === undefined) {
//                     return res.send({msg: "Publisher is not present"})
//                 } else {
//                     let bookCreated = await bookModel.create(req.body)
//                     return res.send({data: bookCreated})
//                 }
//             } else {
//                 return res.send({msg: "Publisher id is required"})
//             }
//         }
//     }
//     else {
//         return res.send({msg: "Author id is required"})
//     }
// }

// const getBooksWithAuthor = async function (req, res) {
//     let allBooks = await bookModel.find().populate('author_id').populate('publisher_id');
//     res.send({data: allBooks});
// };


// module.exports.createBook= createBook
// module.exports.getBooksWithAuthor = getBooksWithAuthor