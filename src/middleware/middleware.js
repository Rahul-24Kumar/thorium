
const validationHeader= async function(req, res, next){
    let data = req.headers["isfreeappuser"]
    console.log(data)
    if(data) {
        next()
    } else {
        res.send("the request is missing a mandatory header")
    }
}

module.exports.validationHeader=validationHeader

