const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const messageSchema = new mongoose.Schema({
    message: {
        text:{
            type:String,
            required: true,
        },
        users:Array,
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
},
{
    timestamps:true,
});

const message = mongoose.model("Messages",messageSchema)


async function addMessage(from,to,msg){
    try {
        const data = await message.create({
            message:{
                text:msg,
                users:[from,to]
            },
            sender:from
        })
        return data
    }
    catch (error){
        console.log(error)
        throw(error);
    }
}

module.exports = {
    Message: message,
    addMessages:addMessage
}