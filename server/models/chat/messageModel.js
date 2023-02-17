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
        throw(error);
    }
}

async function getMessages(from,to){
    try{
        const messages = await message.find({"message.users":{$all:[from,to]}}).sort({updatedAt:1});
        const projectMessage = messages.map((msg) =>{
            return({fromSelf:msg.sender.toString() === from,message:msg.message.text})
        })
        return projectMessage
    }
    catch (e){
        throw(e)
    }
}

module.exports = {
    Message: message,
    addMessages:addMessage,
    getMessages:getMessages
}