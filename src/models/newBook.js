const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const newBookSchema = new mongoose.Schema( {
    
    name: String,
    author_id: {
        type: ObjectId,
        ref: "Author"
    },
    price: Number,
    ratiings: Number,
    publisher_id: {
        type: ObjectId,
        ref : "Publisher"
    }
    
}, { timestamps: true });

module.exports = mongoose.model('Book', newBookSchema) //users



// String, Number
// Boolean, Object/json, array