const express = require("express")
const bodyParser = require('body-parser');
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes")
const {avatarRoute} = require("./routes/avatarRoute")
const app = express()
require("dotenv").config()

const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth",userRoutes)

app.use("/avatar",avatarRoute)

const server = app.listen(PORT,() => {
    console.log("Server started on port ",PORT)
})
 
async function mongo(){
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL)
}

mongo()
    .then(() => console.log("Connection Successfull DB"))
    .catch(err => console.log(err))