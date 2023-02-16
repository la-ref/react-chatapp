const { getavatar,setAvatar } = require("../controllers/avatarController");
const rateLimit = require('express-rate-limit')

const router = require("express").Router();

const limiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	max: 15, // Limit each IP to 15 requests per `window`
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        status: 429, // optional, of course
        limiter: true,
        type: "error",
        message: 'Limit reached: 15 calls/min'
    }
})

router.get("/avatar",limiter,getavatar)

router.post("/setAvatar/:id",setAvatar)

module.exports.avatarRoute = router;