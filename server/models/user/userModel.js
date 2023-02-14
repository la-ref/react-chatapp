const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min:3,
        max:15,
        unique:true,
    },
    email: {
        type: String,
        required: true,
        min:4,
        max:50,
        unique:true,
    },
    password: {
        type: String,
        required: true,
        min:8,
        max:30,
    },
    isAvatarImageSet : {
        type: Boolean,
        default : false,
    },
    avatarImage:{
        type:String,
        default:""
    }
});

const users = mongoose.model("Users",userSchema)


async function createUser(username,email,password){
    try {
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await users.create({
            username,
            email,
            password:hashedPassword
        })

        const userCopy = {...user._doc}
        delete userCopy.password
        delete userCopy._id
        delete userCopy.__v
        return userCopy
    }
    catch (error){
        throw(error);
    }
}

module.exports = {
    User: users,
    createUser:createUser
}