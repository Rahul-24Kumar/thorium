const mongoose = require('mongoose');

const productSchema = new mongoose.Schema( {
    
        //_id: ObjectId("61951bfa4d9fe0d34da86829"),
        name: String,
        category: String,
        price: {   
        type: Number,
        required: true
            }
    })

module.exports = mongoose.model('productNew1', productSchema) //users



// String, Number
// Boolean, Object/json, array