const {User,createUser} = require("../models/userModel.js")
const {userNameVerification,emailVerification,passwordVerification} = require("../models/userVerificationModel.js")



module.exports.register = async (req,res,next) => {
    try {
        const {username,email,password,confirmPassword} = req.body;
        const checkers = [userNameVerification(username),emailVerification(email),passwordVerification(password,confirmPassword)]
        const results = await Promise.all(checkers);
        
        for (let result of results) {
            let [err,status] = result
            if (!err){
                return res.json({msg:err,status:status})
            }
        }

        await createUser(username,email,password)
            .then((user) =>{
                return res.json({user,status:true})
            })
            .catch((e) =>{
                console.log(e)
                return res.json({msg:"Error could not create user",status:false})
            })
    }
    catch (e){
        next()
        return res.json({msg:"Error",status:false})
    }

}