const productModel1 = require("../models/productModel")

const createProduct = async function(req, res){
    let product = await productModel1.create(req.body)
    res.send({product: product})
}

module.exports.createProduct = createProduct
 