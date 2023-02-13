const {User} = require("./userModel")
const bcrypt = require("bcrypt")

async function userNameVerification(username){
    const checkUserName = await User.findOne({username})
    if(checkUserName && (checkUserName.username === username || checkUserName.email === username)){
        return [true,null]
    }
    return [false,"Username or email Does Not Exist"]
}

async function passwordVerification(username,password){
    const user = await User.findOne({username})
    if (user) {
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(isPasswordValid){
            return [true,user]
        }
    }
    return [false,"Incorrect Password"]
}

module.exports = {userNameVerifLog:userNameVerification, passVerifLog:passwordVerification}
