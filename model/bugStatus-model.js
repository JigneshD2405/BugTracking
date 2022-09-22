const mongoose = require("mongoose")

let bugStatusSchema = new mongoose.Schema({
    statusName :{
        type:String
    }
    
})

let bugStatusModel = mongoose.model("bugStatus",bugStatusSchema)

module.exports =bugStatusModel