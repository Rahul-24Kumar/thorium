const orderModel = require("../models/orderModel")
const productModel = require("../models/productModel")
const userModel = require("../models/userModel")

const createOrder = async function (req, res) {
    let order = req.body;
    let usrId = req.body.userId;
    let pdtId = req.body.productId;
    let currentDate = new Date()
    let updatedDate = currentDate.getDate() + "/"
        + currentDate.getMonth() + "/"
        + currentDate.getFullYear()

    if (!usrId) {
        return res.send("user Id must be present in the request body");
    }

    let validUserId = await userModel.findById(usrId);
    if (!validUserId) {
        return res.send("no user present with the given id");
    }

    if (!pdtId) {
        return res.send("product Id must be present in the request body");
    }


    let validProductId = await productModel.findById(pdtId);
    if (!validProductId) {
        return res.send("no product present with the given id");
    }

    let orderCreated = await orderModel.create(order);
    let value = req.headers["isfreeappuser"]
    if (value == "true") {
        let customer = await OrderModel.findOneAndUpdate(
            { userId: usrId },
            { $set: { amount: 0, isFreeAppUser: true, date: updatedDate } },
            { $new: true }

        )
        return res.send({ data: customer })

    }
    else {

        let userBalance = await userModel.findById(usrId)
        let productAmount = await productModel.findById(pdtId)
        let pay = userBalance.balance - productAmount.price
        if (pay >= 0) {
            let customerOrder = await orderModel.findOneAndUpdate(
                { userId: usrId },
                { $set: { amount: productAmount.price, isFreeAppUser: true, date: updatedDate } },
                { $new: true }

            )
            let customer = await userModel.findOneAndUpdate(
                { _id: usrId },
                { $set: { balance: pay, isFreeAppUser: true } },
                { $new: true }

            )
            let result = {}
            result.order = customerOrder
            result.user = customer

            return res.send({ data: result })
        } else {
            return res.send({ msg: "insufficient balance" })
        }

    }

};

module.exports.createOrder = createOrder