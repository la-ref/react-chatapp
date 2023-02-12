const mongoose = require("mongoose")
const {User} = require("../models/userModel")

async function userNameVerification(username){
    checkUserName = await User.findOne({username})
    if(checkUserName){
        return [false,"Username Already Exist"]
    }
    const verifRegex = (/^[a-zA-Z0-9_.-]{3,16}$/.test(username));
    if (!verifRegex){
        return [false,"Username invalid"]
    }
    return [true,null]
}

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

async function emailVerification(email){
    checkEmail = await User.findOne({email})
    if(checkEmail){
        return [false,"Email Already Exist"]
    }
    if (!validateEmail(email)) {
        return [false,"Invalid Email Address"]
    }
    return [true,null]
}

async function passwordVerification(password,confirmPassword){
    if(password !== confirmPassword){
        return [false,"Password and confirm password should be the same"]
    }
    if (password.length < 8) {
        return [false,"Password should be equal greater than 8 characters"]
    }
    if (password.length > 31) {
        return [false,"Password should be lower than 32 characters"]
    }
    return [true,null]
}

module.exports = {userNameVerification,emailVerification,passwordVerification}
