const axios = require("axios");
const { Buffer } = require('buffer');
require("dotenv").config()

async function getService(username) {
    console.log(`${process.env.EXTERNAL_API_AVATAR}/${username}?apikey=${process.env.EXTERNAL_API_AVATAR_TOKEN}`)
    const res = await axios.get(`${process.env.EXTERNAL_API_AVATAR}/${username}?apikey=${process.env.EXTERNAL_API_AVATAR_TOKEN}`)
    if (res.data.toLowerCase().includes("Limit reached")){
        return undefined
    }
    const buff = Buffer.from(res.data);
    return buff.toString("base64")
}
module.exports.getService = getService;