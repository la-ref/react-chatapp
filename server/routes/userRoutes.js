const { register } = require("../controllers/userControler");

const router = require("express").Router();

router.post("/register",register)

module.exports = router;