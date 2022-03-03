const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    name: String,
	author: {type: ObjectId, ref: "NewAuthor1"},
	price: Number,
    ratings: Number,
    HardCover: {
       type: Boolean,
        default:false
    }, 
	publisher: {type: ObjectId, ref: "NewPublisher1"}
}, { timestamps: true });


module.exports = mongoose.model('NewBook1', bookSchema)