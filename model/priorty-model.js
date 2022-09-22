const mongoose = require("mongoose")

let prioritySchema = new mongoose.Schema({
    priorityName:{
        type:String
    },
    isActive:{
        type:Boolean
    }    
    })
let priorityModel = mongoose.model("priority",prioritySchema)

module.exports=priorityModel