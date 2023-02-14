const mongoose = require("mongoose")

const avatarSchema = new mongoose.Schema({
    svg: {
        type: String,
        required: true,
    },
});

module.exports.avatar = mongoose.model("avatar",avatarSchema)
