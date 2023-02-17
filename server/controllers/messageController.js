const {addMessages} = require("../models/chat/messageModel.js");

module.exports.addMessage = async (req,res,next) => {
    try {
        const {from,to,message} = req.body;
        const data = await addMessages(from,to,message)
        if (data){
            return res.json({msg:"Message sended",status:true})
        }
    
    }
    catch{
        next()
        return res.json({msg:"Error could not send the message",status:false})
    }
}

module.exports.getAllMessage = async (req,res,next) => {
    try {
    
    
    }
    catch{

    }
}