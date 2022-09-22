const mongoose= require("mongoose")


const moduleSchema = new mongoose.Schema({
    moduleName:{
        type:String
    },
    description:{
        type:String
    },
    estimatedHour:{
        type:String
    },
    startDate:{
        type:String
    },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"project"
    },
    priorityId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"priority"
    },
    statusId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"status"
    }
})
 const moduleModel = mongoose.model("module",moduleSchema)

 module.exports=moduleModel