const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    projectName :{
        type : String
    },
    description:{
        type:String
    },
    projectManagerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    technology:{
        type:String
    },
    statusId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"status"
    },
    startDate:{
        type:String
    },
    estimatedHour:{
        type:String
    }
})
const projectModel = mongoose.model("project",projectSchema)

module.exports=projectModel