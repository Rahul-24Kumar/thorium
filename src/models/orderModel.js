const mongoose = require('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectID


const orderSchema = new mongoose.Schema( {
userId: {
    type: ObjectID,
    ref: "UserNew1"
},
productId:  {
    type: ObjectID,
    ref: "productNew1"
},
amount: Number,
isFreeAppUser: {
    type: Boolean,
    default: false
},
date: String,
 },
 {timestamps: true});

module.exports = mongoose.model('orderNew1', orderSchema)