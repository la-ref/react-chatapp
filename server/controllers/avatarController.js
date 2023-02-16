const {avatar} = require("../models/avatar/avatarModel.js")
const {User} = require("../models/user/userModel.js")
const {getService} = require("../externals/externalAvatar")

module.exports.getavatar = async (req,res,next) => {
    try {
        if (req.query.username){
            const img = await getService(req.query.username)
            if (img) {
                const found = await avatar.findOne({svg:img})
                if (!found){
                    avatar.create({svg:img})
                }
                return res.json({svg:img,status:true}) 
            }
            else {
                avatar.count().exec(function (err, count) {
                    const random = Math.floor(Math.random() * count)
                    // Again query all users but only fetch one offset by our random #
                    avatar.findOne().skip(random).exec(
                        function (_, result) {
                        return res.json({svg:result,status:true}) 
                        })
                })
            }
        }
        else {
            return res.json({msg:"Please provide a username in query params",status:false})
        }
    }
    catch (e){
        next()
        return res.json({msg:"Error",status:false})
    }

}

module.exports.setAvatar = async (req,res,next) => {
    try {
        const userID = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userID,{
            isAvatarImageSet:true,
            avatarImage
        })
        return res.json({img:avatarImage,status:true})
    }
    catch {
        next()
        return res.json({msg:"Error",status:false})
    }
}