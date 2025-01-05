require("dotenv").config()
const express = require("express")
const cors = require("cors")
const dbconnect = require("./config//dbconnect")
const corsOptions = require("./config/corsOptions")
const { default: mongoose } = require("mongoose")
const  PORT = process.env.PORT || 7000
const app = express()

dbconnect()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))
app.use("/api/user",require("./routes/user"))
app.use("/api/post",require("./routes/post"))
app.use("/api/todo",require("./routes/todo"))

app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})

mongoose.connection.once('open', ()=>{
    console.log('Connect to database')
    app.listen(PORT,()=>{
        console.log(`server runing on port ${PORT}`)
    })
})
mongoose.connection.on('error', (err)=>{
    console.log(err)
})


