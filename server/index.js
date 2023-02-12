const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
require("dotenv").config()

const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json())

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