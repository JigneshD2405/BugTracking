const mongoose=require("mongoose")

const projectTeamSchema=new mongoose.Schema({
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"project"
    },
    
    projectTeamMember:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    projectTeamStatusId:{
        type:Boolean
    },
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"role"
    }
})

let projectTeamModel=mongoose.model("projectTeamModel",projectTeamSchema)

module.exports=projectTeamModel