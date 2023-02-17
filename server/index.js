const express = require("express")
const bodyParser = require('body-parser');
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes")
const {avatarRoute} = require("./routes/avatarRoute")
const messageRoute = require("./routes/messageRoute")
const app = express()
const socket = require("socket.io");
require("dotenv").config()

const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth",userRoutes)

app.use("/api/",avatarRoute)

app.use("/api/messages/",messageRoute)

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

const io = socket(server,{
    cors:{
        orgin:"http://localhost:5000",
        credentials:true,
    }
})

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

global.onlineUsers = {}

io.on("connection",(socket) => {
    socket.on("add-user",(userId) => {
        onlineUsers[userId] = {socket:socket.id}
    })

    socket.on("send-msg",(data) => {
        const sendUserSocket = onlineUsers[data.to];
        if (sendUserSocket){
            console.log("send to",data)
            console.log(onlineUsers,"msg")
            socket.to(sendUserSocket.socket).emit("msg-receive",{msg:data.message,from:data.from})
        }
    })

    socket.on('disconnect', function() {
        const key = getKeyByValue(onlineUsers,socket)
        delete onlineUsers[key]
        console.log(onlineUsers,"disco")
     });
})