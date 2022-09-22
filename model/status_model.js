const mongoose = require("mongoose")

let statusSchema = new mongoose.Schema({
    statusName :{
        type:String
    },
    isActive:{
        type:Boolean
    }
})

let statusModel = mongoose.model("status",statusSchema)

module.exports =statusModel