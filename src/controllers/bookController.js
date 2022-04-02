const bookModel = require('../models/bookModel')
const userModel = require('../models/userModel')
const reviewModel = require('../models/reviewModel')
const moment = require("moment")

const isValid = function(value) {
    if(typeof value === 'undefined' || value === null) return false
    if(typeof value === 'string' && value.trim().length === 0) return false
    return true;
}
//1
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*## Books API
### POST /books
- Create a book document from request body. Get userId in request body only.
- Make sure the userId is a valid userId by checking the user exist in the users collection.
- Return HTTP status 201 on a succesful book creation. Also return the book document. The response should be a JSON object like [this](#successful-response-structure) 
- Create atleast 10 books for each user
- Return HTTP status 400 for an invalid request with a response body like [this](#error-response-structure)*/

const createBook = async function (req, res) {
    try {
        const bookBody = req.body
        if(Object.keys(bookBody) == 0) {
            return res.status(400).send({status: false, message: 'bookDetails must be provided'})
        }

        const { title, excerpt, userId, ISBN, category, subcategory, reviews, releasedAt } = bookBody
        
         //----------------------------------------------------------------------------------------titleValidation
        if(!isValid(title)) {
            return res.status(400).send({status: false, message: 'title is required'})
        }

         let duplicateTitle = await bookModel.findOne({title:title})
         
         if(duplicateTitle) {
            return res.status(400).send({status: false, message: 'title alredy exists'})
        }
         
         //----------------------------------------------------------------------------------------excerptValidation
        if(!isValid(excerpt)) {
            return res.status(400).send({status: false, message: 'excerpt is required'})
        }
        
        //----------------------------------------------------------------------------------------userIdValidation
        if(!isValid(userId)) {
            return res.status(400).send({status: false, message: 'userId is required'})
        }

        const userNotInDB = await userModel.findById(userId) 

        if(!userNotInDB) {
            return res.status(400).send({status:false, msg: `${userId} not in DB `})
        }
        
        //----------------------------------------------------------------------------------------ISBNValidation
        if(!isValid(ISBN)) {
            return res.status(400).send({status: false, message: 'ISBN is required'})
        }

        if (!(/^\+?([1-9]{3})\)?[-. ]?([0-9]{10})$/.test(ISBN))) {
          return res.status(400).send({ status: false, message: 'please provide valid ISBN' })
        }
        
        let duplicateISBN = await bookModel.findOne({ISBN:ISBN})
         
         if(duplicateISBN) {
            return res.status(400).send({status: false, message: 'ISBN alredy exists'})
        }

        //----------------------------------------------------------------------------------------categoryValidation
        if(!isValid(category)) {
            return res.status(400).send({status: false, message: 'category is required'})
        }
        //----------------------------------------------------------------------------------------subcategoryValidation
        if(!isValid(subcategory)) {
            return res.status(400).send({status: false, message: 'subcategory is required'})
        }
        //----------------------------------------------------------------------------------------reviewsValidation
        if(!isValid(reviews)) {
            return res.status(400).send({status: false, message: 'reviews is required'})
        }
        //----------------------------------------------------------------------------------------releasedAtValidation
        if(!isValid(releasedAt)) {
            return res.status(400).send({status: false, message: 'releasedAt is required'})
        }

        if(!(/^((?:19|20)[0-9][0-9])-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/.test(bookBody.releasedAt))) {
            return res.status(400).send({status: false, message: 'Invalid date format'})
        }
          
        const reqData = { title, excerpt, userId, ISBN, category, subcategory, reviews, releasedAt:moment(releasedAt) }



        //---------------------------------------------------------------------------------------------bookCreation
        const newBook = await bookModel.create(reqData)
            return res.status(201).send({ status:true, data:newBook, message: "book created successfully"})

    }
    catch(error) {
        return res.status(500).send({status: false, error: error.message})
    }
}

//2
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*### GET /books
- Returns all books in the collection that aren't deleted. Return only book _id, title, excerpt, userId, category, releasedAt, reviews field. Response example [here](#get-books-response)
- Return the HTTP status 200 if any documents are found. The response structure should be like [this](#successful-response-structure) 
- If no documents are found then return an HTTP status 404 with a response like [this](#error-response-structure) 
- Filter books list by applying filters. Query param can have any combination of below filters.
  - By userId
  - By category
  - By subcategory
  example of a query url: books?filtername=filtervalue&f2=fv2
- Return all books sorted by book name in Alphabatical order*/

const getBooks=async function(req,res){

    try{
         const queryParams=req.query
        
            const book = await bookModel.find({$and:[queryParams,{isDeleted:false}]}).select({ "_id": 1, "title": 1, "excerpt": 1, "userId": 1 ,"category":1,"releasedAt":1,"reviews":1 }).sort({"title":1})
	          
            if (book.length > 0) {
              res.status(200).send({ status: true,count: book.length,message:'Books list', data: book })
            }
            else {
              res.status(404).send({ msg: "book not found" })
            }
          
    }catch(error){
        res.status(500).send({status:true,message:error.message})
    }

}
//3
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*### GET /books/:bookId
- Returns a book with complete details including reviews. Reviews array would be in the form of Array. Response example [here](#book-details-response)
- Return the HTTP status 200 if any documents are found. The response structure should be like [this](#successful-response-structure) 
- If the book has no reviews then the response body should include book detail as shown [here](#book-details-response-no-reviews) and an empty array for reviewsData.
- If no documents are found then return an HTTP status 404 with a response like [this](#error-response-structure)*/ 
 const getBookById = async function (req, res) {
    try {
        const bookId = req.params.bookId
       
        if (!(/^[0-9a-fA-F]{24}$/.test(bookId))) {
            return res.status(400).send({ status: false, message: 'please provide valid bookId' })
          }
        const findBook = await bookModel.findById({ _id: bookId,  isDeleted: false})
        console.log(findBook)

        if (!findBook) {
          return res.status(404).send({ status: false, message: 'book not found' })
        }
    
        const review = await reviewModel.find({ bookId: bookId, isDeleted: false }).select({ _id: 1, bookId: 1, reviewedBy: 1, reviewedAt: 1, rating: 1, review: 1 })
    
        return res.status(200).send({ status: true, message: "Books List", data: { ...findBook.toObject(), reviewsData: review } })
      }
    
    catch(error) {
        return res.status(500).send({status: false, error: error.message})
    }
}


//4
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*### PUT /books/:bookId
- Update a book by changing its
  - title
  - excerpt
  - release date
  - ISBN
- Make sure the unique constraints are not violated when making the update
- Check if the bookId exists (must have isDeleted false and is present in collection). If it doesn't, return an HTTP status 404 with a response body like [this](#error-response-structure)
- Return an HTTP status 200 if updated successfully with a body like [this](#successful-response-structure) 
- Also make sure in the response you return the updated book document.*/

const updateBook = async function (req, res) {
  try {
    const bookId = req.params.bookId

    if (!(/^[0-9a-fA-F]{24}$/.test(bookId))) {
      res.status(400).send({ status: false, message: 'please provide valid bookId' })
      return
    }

    const book = await bookModel.findById({ _id: bookId, isDeleted: false })
    console.log(book)

    if(!(book)) {
      res.status(404).send({ status: false, message: "No data found" })
      return
    }

    if(Object.keys(req.body) == 0) {
      res.status(400).send({status: false, message: 'please provide data for updation'})
      return
  }

    const {title, excerpt, ISBN, releasedAt} = req.body

      if (!isValid(title)) {
        res.status(400).send({ status: false, message: 'please provide title' })
        return
      }

      const duplicateTitle = await bookModel.findOne({title: title})
      if (duplicateTitle) {
        res.status(400).send({ status: false, message: "This title already in use ,please provide another one" })
        return
      }
    
      if (!isValid(excerpt)) {
        res.status(400).send({ status: false, message: 'please provide excerpt' })
        return
      }
  
      if (!isValid(ISBN)) {
        res.status(400).send({ status: false, message: 'please provide ISBN' })
        return
      }
  
      if (!(/^\+?([1-9]{3})\)?[-. ]?([0-9]{10})$/.test(ISBN))) {
        return res.status(400).send({ status: false, message: 'please provide valid ISBN' })
      }

      const duplicateISBN = await bookModel.findOne({ ISBN:ISBN })
      if (duplicateISBN) {
        res.status(400).send({ status: false, message: "This ISBN already in use ,please provide another one" })
        return
      }

      if (!isValid(releasedAt)) {
        res.status(400).send({ status: false, message: 'please provide releasedAt' })
        return
      }
      if (!(/^((?:19|20)[0-9][0-9])-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/.test(releasedAt))) {
        return res.status(400).send({ status: false, message: 'please provide valid date in format (YYYY-MM-DD)' })
      }

      const updateData = {title, excerpt, ISBN, releasedAt: moment(releasedAt)}
    
    const updatedBook = await bookModel.findOneAndUpdate({ _id: bookId },{...updateData}, { new: true })

    return res.status(200).send({ status: true, message: "Book updated successfully", data: updatedBook })
  }
  catch (err) {
    console.log(err)
    res.status(500).send({ status: false, msg: err.message })
  }
}
  
// 5
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*### DELETE /books/:bookId
- Check if the bookId exists and is not deleted. If it does, mark it deleted and return an HTTP status 200 with a response body with status and message.
- If the book document doesn't exist then return an HTTP status of 404 with a body like [this](#error-response-structure)*/
const deleteBookById = async function (req, res) {
    try {

      const bookId = req.params.bookId

      if (!(/^[0-9a-fA-F]{24}$/.test(bookId))) {
        return res.status(400).send({ status: false, message: 'please provide valid bookId' })
      }
   
      const book = await bookModel.findOne({ _id: bookId })
    
      if (!book) {
        res.status(404).send({ status: false, message: 'bookId not found' })
        return
      }
   
      if (book.isDeleted == true) {
        res.status(400).send({ status: false, message: "Book is already deleted" })
        return
      }
  
      const deletedBook = await bookModel.findOneAndUpdate({ _id: bookId }, { $set: { isDeleted: true, deletedAt: new Date() } })
  
      res.status(200).send({ status: true, message: "Success" ,message: "Book deleted successfully" })
      return
    }
    catch (err) {
      console.log(err)
      res.status(500).send({ status: false, msg: err.message })
    }
  }

module.exports.createBook = createBook
module.exports.getBooks = getBooks
module.exports.getBookById = getBookById
module.exports.updateBook = updateBook
module.exports.deleteBookById = deleteBookById






