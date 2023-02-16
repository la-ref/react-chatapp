const {createUser} = require("../models/user/userModel.js")
const {userNameVerification,emailVerification,passwordVerification} = require("../models/user/userRegisterVerificationModel.js")
const {userNameVerifLog,passVerifLog} = require("../models/user/userLoginVerificationModel.js")
const {User} = require("../models/user/userModel.js")



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
        next()
        return res.json({msg:"Error",status:false})
    }

}

module.exports.getAllUsers = async (req,res,next) => {
    try {
        const users = await User.find({_id:{$ne:req.params.id}}).select(["email","username","avatarImage","_id"])
        return res.json({users,status:true})
    }
    catch{
        next()
        return res.json({msg:"Error",status:false})
    }

}