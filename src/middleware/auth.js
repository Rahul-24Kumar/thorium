const jwt = require("jsonwebtoken");

let authenticate= function (req,res,next){
let token = req.headers["x-Auth-token"];
if (!token) token = req.headers["x-auth-token"];
if (!token) return res.send({ status: false, msg: "token must be present" });
else {next()}
}

let authorise= function (req,res,next){
    let token= req.headers["x-auth-token"];
    let decodedToken= jwt.verify(token, "functionup-thorium")
    let toBeUpdatedUserId= req.params.userId;
    let loggedInUserId= decodedToken.userId;
    if(loggedInUserId != toBeUpdatedUserId) return res.send({status:false, msg:"you are not authorized to perform this task"})
    else {next()}
}


module.exports.authenticate= authenticate
module.exports.authorise= authorise


//     let tokenCheck = async function (req, res, next) {
//     let token = req.headers["x-Auth-token"];
//     let validToken = jwt.verify(token, "functionup-thorium");
//     if (validToken) {
//         req.userId=req.userId
//         next()
      
// } else { 
//     res.send({ status: false, msg: "token is invalid" })}
// };

// module.exports.tokenCheck = tokenCheck;