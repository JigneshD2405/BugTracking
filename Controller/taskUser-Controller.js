const TaskUserModel =require("../model/taskUser-model")
const TaskModel =require("../model/task-model")

module.exports.addTaskUser=function (req,res){
    const taskUser= req.body.taskUser
    const taskId  = req.body.taskId 
    const projectId=req.body.projectId
    const moduleId =req.body.moduleId
    const status ="pending"
    
    let TaskUser = new TaskUserModel({
        taskUser:taskUser,
        taskId:taskId,
        projectId:projectId,
        moduleId:moduleId,
        status:status
    })
    TaskUser.save(function(err,success){
        if(err){
        
            res.json({msg:"Something Wrong",status:-1,data:req.body})        
        }
        else{
            TaskModel.updateOne({_id:taskId},{assigned:true},function(err,success){
            res.json({msg:"Task Assign to user",status:200,data:success})
        })
        }
    })
}

module.exports.getAllTaskUser = function(req,res){
    TaskUserModel.find().populate("taskUser").populate("taskId").exec(function(err,roles){
        if(err){
            res.json({msg:"Something Wrong",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Data Retraive",status:200,data:roles})
        }
    })
}
module.exports.deleteTaskUser = function(req,res){
    let taskUser = req.params.taskUser
    let taskId = req.body.taskId
    TaskUserModel.deleteOne({_id:taskId},{taskUser:taskUser},{taskId:taskId},function(err,data) {
        if(err){
            res.json({msg:"Something Wrong",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Delete Successfully",status:200,data:data})
        }
    })
}
module.exports.updateTaskUser=function(req,res){
    let taskUser = req.body.taskUser
    let taskId = req.body.taskId
    TaskUserModel.deleteOne({_id:taskUser},{taskUser:taskUser},{taskId:taskId},function(err,data) {
        if(err){
            res.json({msg:"Something Wrong",status:-1,data:req.body})
        }
        else{
            res.json({msg:"updated Successfully",status:200,data:data})
        }
    })

}
module.exports.getTaskBydeveloper = function (req, res) {
    let developerId=req.params.developerId
    TaskUserModel.find({taskUser:developerId}).populate("taskUser").populate("taskId").populate("projectId").populate("moduleId").exec(function (err, success) {
        if (err) {

            res.json({
                msg: "SMW",
                data: err,
                status: -1
            })
        } else {
            res.json({
                msg: "Project Listed",
                data: success,
                status: 200
            })
        }
    })
}
module.exports.submitTask=function(req,res){
    let taskId=req.body.taskId
    let testerId=req.body.testerId
    let developerId=req.body.developerId
    let complitionTime=req.body.complitionTime
    TaskUserModel.find({taskUser:developerId,taskId:taskId},function(err,success){
        if (err) {

            res.json({
                msg: "SMW",
                data: err,
                status: -1
            })
        } else {
            TaskUserModel.updateOne({taskId:taskId},{status:"Finished"},function(err,success){
                if (err) {

                    res.json({
                        msg: "SMW",
                        data: err,
                        status: -1
                    })
                }else{
                    TaskModel.updateOne({_id:taskId},{developerId:developerId,testerId:testerId,completionTime:complitionTime,statusId:"623ade3d578094a882a2ba36"},function(err,success){
                        if (err) {

                            res.json({
                                msg: "SMW",
                                data: err,
                                status: -1
                            })
                        } else {
                            res.json({
                                msg: "Task Completed",
                                data: success,
                                status: 200
                            })
                        }
                    })
                }
            })
        }

    })
}

module.exports.getPendingTaskbyDeveloper = function (req, res) {
    let developerId=req.params.userId
    TaskUserModel.find({taskUser:developerId,status:"pending"}).populate("taskUser").populate("taskId").populate("projectId").populate("moduleId").exec(function (err, success) {
        if (err) {

            res.json({
                msg: "SMW",
                data: err,
                status: -1
            })
        } else {
            res.json({
                msg: "Project Listed",
                data: success,
                status: 200
            })
        }
    })
}