const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    
        //_id: ObjectId("61951bfa4d9fe0d34da86829"),
        name: String,
        balance: {
            type: Number,
            default: 100
        }, // Default balance at user registration is 100
        address:String,
        age: Number,
         gender: {
             type: String,
            enum: ['male','female','others']
            },  // Allowed values are - “male”, “female”, “other”
        isFreeAppUser: {
            type: Boolean,
            default: false
        }
        },
        {timestamps: true})

module.exports = mongoose.model('UserNew1', userSchema) //users



// String, Number
// Boolean, Object/json, array