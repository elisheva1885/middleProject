const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        },
    username:{
        type: String,
        required: true,
        immutable: true,
        uniqe:true
    },
    email: String,
    address:String,
    phone:String

},{
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)