const {User,createUser} = require("../models/userModel.js")
const {userNameVerification,emailVerification,passwordVerification} = require("../models/userRegisterVerificationModel.js")
const {userNameVerifLog,passVerifLog} = require("../models/userLoginVerificationModel.js")



module.exports.register = async (req,res,next) => {
    try {
        const {username,email,password,confirmPassword} = req.body;
        const checkers = [userNameVerification(username),emailVerification(email),passwordVerification(password,confirmPassword)]
        const results = await Promise.all(checkers);
        
        for (let result of results) {
            let [err,status] = result
            if (!err){
                return res.json({msg:status,status:err})
            }
        }

        await createUser(username,email,password)
            .then((user) =>{
                return res.json({user,status:true})
            })
            .catch((e) =>{
                return res.json({msg:"Error could not create user",status:false})
            })
    }
    catch (e){
        next()
        return res.json({msg:"Error",status:false})
    }

}

module.exports.login = async (req,res,next) => {
    try {
        const {username,password} = req.body;
        const checkers = [userNameVerifLog(username),passVerifLog(username,password)]
        const results = await Promise.all(checkers);
        
        for (let result of results) {
            let [err,status] = result
            if (!err){
                return res.json({msg:status,status:err})
            }
        }
        checkers[1].then((val) => {
            return res.json({user:val[1], status:true})
        })
    }
    catch (e){
        console.log(e)
        next()
        return res.json({msg:"Error",status:false})
    }

}