const { count } = require("console")
const BookModel= require("../models/bookModel")

const createBook= async function (req, res) {
    let data= req.body
    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

const getBooksData= async function (req, res) {
    let allBooks = await BookModel.find()
    res.send({msg: allBooks})
}

const getBooksLists= async function(req,res) {
    let page= req.query.page
    let bookList = await BookModel.find().select({ bookName: 1, authorName: 1, _id:0 })
    res.send({msg: bookList})
}

const getBooksInYear= async function(req,res) {
    let booksYear = await BookModel.find({"year": 2021})
    res.send({msg: booksYear})
}

const getParticularBooks= async function(req,res) {
    let particularBook = await BookModel.find({ bookName:  /^program/i  })
    res.send({msg: particularBook})
}

const getXINRBooks= async function(req,res) {
    let priceOfBooks = await BookModel.find({"prices.indianPrice": {$in: ["INR100", "INR200", "INR500"] } }  )
    res.send({msg: priceOfBooks})
}

const getRandomBooks= async function(req,res) {
    let pagesBook = await BookModel.find({ totalPages: { $gte: 500 }  })
    res.send({msg: pagesBook})
}




// const { count } = require("console")
// const BookModel= require("../models/bookModel")

// const createBook= async function (req, res) {
//     let data= req.body

//     let savedData= await BookModel.create(data)
//     res.send({msg: savedData})
// }

// //today

// const getParticularBooks = async function (req, res) {
//     let data= req.body
//     let savedData= await BookModel.find({
//         $or: [{bookName: "hi".select(bookName)},{year:2020}.select(bookName),select(data)]
//     })
//     res.send({msg: savedData})
// }

// const bookList = async function (req, res) {
// //.select( { bookName: 1, authorName: 1, _id: 0})
//     let savedData= await BookModel.find().select({bookName: 1, authorName: 1,})
//     res.send({msg: savedData})
// }

// const getBooksInYear = async function (req, res) {
//     let savedData= await BookModel.find({
//         bookName: {$in: ["Rama","kama","yama" ]}.select({year: 1999})
//     })
//     res.send({msg: savedData})


// const getRandomBooks = async function (req, res) {
//     let page= req.query.page
//     let pageSize = req.query.pageSize
//     let savedData= await BookModel.find({
//         $or: [{stock: true},skip(pageSize * (page-1)).limit(pageSize)]
//     })
//     res.send({msg: savedData})
// }
// const getXINRBooks = async function (req, res) {
//     let savedData= await BookModel.find( {
//         $or: [{prices:"100INR"},{prices:"200INR"}, {prices:"500INR"}]
//     })
//     res.send({msg: savedData})


//today

// const getBooksData= async function (req, res) {

    // let allBooks= await BookModel.find( ).count() // COUNT

    // let allBooks= await BookModel.find( { authorName : "Chetan Bhagat" , isPublished: true  } ) // AND
    
    // let allBooks= await BookModel.find( { 
    //     $or: [ {authorName : "Chetan Bhagat" } , { isPublished: true } , {  "year": 1991 }]
    // } ).select( { bookName: 1, authorName: 1, _id: 0}) // SELECT keys that we want

    // let allBooks= await BookModel.find().sort( { sales: -1 }) // SORT

    // PAGINATION 
    // let page= req.query.page
    // let allBooks= await BookModel.find().skip(3 * (page-1)).limit(3)

    // let allBooks= await BookModel.find().sort({ sales: -1 }).skip(3 * (page-1)).limit(3).select({ bookName: 1, authorName: 1, _id: 0} )


    // let allBooks= await BookModel.find({ sales: { $eq:  137 }  }) 
    // let allBooks= await BookModel.find({ sales: { $ne:  137 }  }) 
    // let allBooks= await BookModel.find({ sales: { $gt:  50 }  }) 
    // let allBooks= await BookModel.find({ sales: { $lt:  50 }  }) 
    // let allBooks= await BookModel.find({ sales: { $lte:  50 }  }) 
    // let allBooks= await BookModel.find({ sales: { $gte:  50 }  }) 
    
    // let allBooks= await BookModel.find({     sales : { $in: [10, 17, 82] }     }).count() 
    // sales : { $in: [10, 17, 82] }
    
    // let allBooks= await BookModel.find({     sales : { $nin: [ 17, 82, 137] }     }).select({ sales: 1, _id:0})
    
    //  let allBooks= await BookModel.find({     $and: [{sales : {$gt: 20}} , [sales:  {$lt: 100}]]    })  //sales is between 20 and 100.... sales > 20 AND sales <100
    //  let allBooks= await BookModel.find({     sales : {$gt: 20, $lt: 100}   })  //sales is between 20 and 100.... sales > 20 AND sales <100


    //  let allBooks= await BookModel.findById("621c60a6b16c9e6bf2736e33") 
    //  let allBooks= await BookModel.findOne( {sales: 10}) 
    //  let allBooks= await BookModel.find( {sales: 10}) 
    
    

    // //  update (not covered: - findByIdAndUpdate | updateOne )
    // let allBooks= await BookModel.update(   
    //     {  sales: {$gt: 10}  }, //condition
    //     { $set: { isPublished: true} } // the change that you want to make
    //     ) 



    // REGEX
    // let allBooks= await BookModel.find( { bookName:  /^Int/  }) 
    // let allBooks= await BookModel.find( { bookName:  /^INT/i  }) 
    // let allBooks= await BookModel.find( { bookName:  /5$/  }) 
    // let allBooks= await BookModel.find( { bookName:  /.*Programming.*/i  }) 
    
    // ASYNC AWAIT
    
    // let a= 2+4
    // a= a + 10
    // console.log(a)
    // let allBooks= await BookModel.find( )  //normally this is an asynchronous call..but await makes it synchronous


    // WHEN AWAIT IS USED: - database + axios
    //  AWAIT can not be used inside forEach , map and many of the array functions..BE CAREFUL
//     console.log(allBooks)
//     let b = 14
//     b= b+ 10
//     console.log(b)
//     res.send({msg: allBooks})
// }


// module.exports.createBook= createBook
// module.exports.getBooksData= getBooksData

// //today
// module.exports.getParticularBooks= getParticularBooks
// module.exports.getBooksLists = getBooksLists
// module.exports.getXINRBooks = getXINRBooks
// module.exports.getRandomBooks = getRandomBooks
// module.exports.getBooksInYear = getBooksInYear
//today
module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksLists= getBooksLists
module.exports.getBooksInYear= getBooksInYear
module.exports.getParticularBooks=getParticularBooks
module.exports.getXINRBooks=getXINRBooks
module.exports.getRandomBooks=getRandomBooks