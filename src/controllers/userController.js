const jwt = require('jsonwebtoken')
const userModel = require("../models/userModel")

const isValid =  function(value) {
    if (typeof value === "undefined" || value == null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
  };
  
  const isValidTitle = function(title) {
    return ['Mr', 'Mrs', 'Miss'].indexOf(title) !== -1
}

/*## User APIs 
### POST /register
- Create a user - atleast 5 users
- Create a user document from request body.
- Return HTTP status 201 on a succesful user creation. Also return the user document. The response should be a JSON object like [this](#successful-response-structure)
- Return HTTP status 400 if no params or invalid params received in request body. The response should be a JSON object like [this](#error-response-structure)
*/


const createUser = async function (req, res) {
try{   
    let  userBody = req.body
   
    if (Object.keys(userBody) == 0) {
        return res.status(400).send({ status: false, msg: "userDetails must be provided" });
      }
    

   let { title , name, phone , email , password, address} = userBody // destructuring

 
   //----------------------------------------------------------------------------------------titleValidation
   if (!isValid(title))  {
    res.status(400).send({ status: false, message: 'title is required' })
       return
    }

    if(!isValidTitle(title)) {
        return res.status(400).send({status: false, message: 'Title is not Valid'})
    }
    
    //----------------------------------------------------------------------------------------nameValidation
    if (!isValid(name)) {
      res.status(400).send({ status: false, message: 'name is required' })
        return
    }

    //---------------------------------------------------------------------------------------phoneValidation
    if (!isValid(phone)) {
        res.status(400).send({ status: false, message: 'phone is required' })
          return
    }

    if (!(/^([+]\d{2})?\d{10}$/.test(userBody.phone))) {
        return res.status(400).send({ status: false, msg: "please provide a valid phone Number" })
    }

    let duplicatePhone  = await userModel.findOne({phone:userBody.phone})
    if(duplicatePhone){
        return res.status(400).send({ status:false, msg: 'Phone already exists'})
    }
    
    //---------------------------------------------------------------------------------------emailValidation
    if (!isValid(email)) {
        res.status(400).send({ status: false, message: 'Email is required' })
          return
    }
    
    if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(userBody.email))) {
        return res.status(400).send({ status: false, msg: "Please provide a valid email" })
    }

    let duplicateEmail  = await userModel.findOne({email:userBody.email})
    if(duplicateEmail){
        return res.status(400).send({ status:false, msg: 'email already exists'})
    }

    //--------------------------------------------------------------------------------------passwordValidation
    if (!isValid(password)) {
        res.status(400).send({ status: false, message: 'password is required' })
          return
    }

    if( !( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(userBody.password))) {
        return res.status(400).send({ status: false, msg: "Please provide a valid password" })
    }

//---------------------------------------------------------------------------------------------addressValidation
 
if (!isValid(address)) {
    res.status(400).send({ status: false, message: 'address is required' })
      return
}

// if (Object.keys(address) == 0) {
//     return res.status(400).send({ status: false, msg: " street||city||pinCode is  required" });
//   }

// if (!isValid(address.street)) {
//     res.status(400).send({ status: false, message: 'street is required' })
//       return
// }
// if (!isValid(address.city)) {
//     res.status(400).send({ status: false, message: 'city is required' })
//       return
// }
// if (!isValid(address.pincode)) {
//     res.status(400).send({ status: false, message: 'pincode is required' })
//       return
// }

//---------------------------------------------------------------------------------------------userCreation
const newUser = await userModel.create(userBody)
res.status(201).send({ status:true, data:newUser, msg: "user created successfully"})

}catch(err){
    res.status(500).send({status : false , msg : err.message})
}
}



/*### POST /login
- Allow an user to login with their email and password.
- On a successful login attempt return a JWT token contatining the userId, exp, iat. The response should be a JSON object like [this](#successful-response-structure)
- If the credentials are incorrect return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)
*/

const userLogin = async function (req, res) {
    try {
        const loginBody = req.body;
        if(!(loginBody)) {
            return res.status(400).send({status: false, message: 'Please provide login details'})

        }

        const {email, password} = loginBody;
        
        if(!isValid(email)) {
            return res.status(400).send({status: false, message: 'Email is required'})
        }
        
        if(!isValid(password)) {
            return res.status(400).send({status: false, message: 'Password is required'})
        }

        const checkEmail = await userModel.findOne({email: email});
        console.log(checkEmail)

        if(!checkEmail) {
            return res.status(401).send({status: false, message: 'Invalid Email'});
        }

        const checkPassword = await userModel.findOne({password: password})

        if(!checkPassword) {
            return res.status(401).send({status: false, message: 'Invalid Password'});
        }
        

        const token = jwt.sign({
            group15: checkEmail._id.toString(),
            iat: Math.floor(Date.now()/1000),
            exp: Math.floor(Date.now()/1000) + 10 * 60 * 60
        },
            'group15Project'
        );
            

         return res.status(200).send({status: true, message: 'User login successfull', token: token});
    } 
    catch (error) {
        return res.status(500).send({status: false, message: error.message});
    }
}





module.exports.createUser = createUser;
module.exports.userLogin = userLogin;
