const { count } = require("console")
const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel = require("../models/publisherModel")

const createBook= async function (req, res) {
    let book = req.body
    let authorId = book.author
    let publisherId = book.publisher

    //validation a
    if(!authorId) return res.send('The request is not valid as the author details are required.')

    //validation b
    let author = await authorModel.findById(authorId)
    if(!author) return res.send('The request is not valid as no author is present with the given author id')

    //validation c
    if(!publisherId) return res.send('The request is not valid as the publisher details are required.') 

    //validation d
    let publisher = await publisherModel.findById(publisherId)
    if(!publisher) return res.send('The request is not valid as no publisher is present with the given publisher id')

    let bookCreated = await bookModel.create(book)
    return res.send({data: bookCreated})
}

const getBooks= async function (req, res) {
    let books = await bookModel.find().populate('author publisher')
    res.send({data: books})
}

const HardCover = async function (req, res) {
    let publisherId = await publisherModel.find({ name: { $in: ["Penguine", "HarperCollins"] } })
    let match = []
    for (let i = 0; i < publisherId.length; i++)
        match.push(publisherId[i]._id)
    let books = await bookModel.updateMany(
        { publisher: { $in: match } },
        { $set: req.body },
        { $new: true }
    )

    res.send({ data: books })
}

const ratings = async function (req, res) {
    let ratings = await authorModel.find({ rating: { $gt: 3.5 } })
    let match = []
    for (let i = 0; i < ratings.length; i++)
        match.push(ratings[i]._id)
    let newbooks = await bookModel.updateMany(
        { authorName: { $in: match } },
        { $inc: req.body },
        { $new: true }
    )
    let bookee = await bookModel.find({ authorName: { $in: match } })

    res.send({ data: bookee })
}


module.exports.createBook= createBook
module.exports.getBooks= getBooks
module.exports.HardCover= HardCover
module.exports.ratings= ratings
