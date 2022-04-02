const jwt = require('jsonwebtoken')
const bookModel = require('../models/bookModel')


const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(400).send({ status: false, msg: "login is required" })
        let decodedtoken = jwt.verify(token, "group15Project")
        if (!decodedtoken) return res.status(401).send({ status: false, msg: "token is invalid" })
        next();
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ msg: error.message })
    }
}

const authorisation = async function(req, res,next){
    try{
        let token = req.headers["x-api-key"];
        const bookId = req.params.bookId
        const decodedToken =jwt.verify(token, "group15Project")
    
        if (!(/^[0-9a-fA-F]{24}$/.test(bookId))) {
            return res.status(400).send({ status: false, message: 'please provide valid bookId' })
        }

        const bookByBookId = await bookModel.findOne({_id : bookId, isDeleted : false})

        if(!bookByBookId){
        return res.status(404).send({status : false, message : `no book found by ${bookId}`})    
        }
        console.log(decodedToken)
        console.log(bookByBookId)

        if((decodedToken.group15 != bookByBookId.userId)){
        
        return res.status(403).send({status : false, message : `unauthorized access`})
        }
        
        if((Date.now() > (decodedToken.exp * 1000))){
        return res.status(401).send({status : false, message : `session expired, please login again`})
        }
        
        next()
    


    }catch(err){
        res.status(500).send({error : err.message})
    }
}

module.exports.authentication = authentication
module.exports.authorisation = authorisation