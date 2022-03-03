const mongoose = require('mongoose');

const newAuthorSchema = new mongoose.Schema( {
    // _id: String,
    authorName: String,
    age:Number,
    address:String

}, { timestamps: true });

module.exports = mongoose.model('Author', newAuthorSchema)