const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: String,
    authorName: String,
    year: {
        type: String,
        unique: true,
        required: true
    },
    
    category: {
        type: String,
        enum: ["comedy", "horror", "romantic"] //"falana" will give an error
    },
    // isIndian: Boolean,
    // parentsInfo: {
    //     motherName: String,
    //     fatherName: String,
    //     siblingName: String
    // },
    // cars: [ String  ]
}, { timestamps: true });

module.exports = mongoose.model('User', bookSchema) //users



// String, Number
// Boolean, Object/json, array