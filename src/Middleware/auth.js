const auth = function(req,res,next) {
    let data = req.headers
    let token = data["x-auth-token"];
    if(!token)
    return res.send({ status: false, msg:"Token must be present"});
    next();
}

module.exports.auth = auth