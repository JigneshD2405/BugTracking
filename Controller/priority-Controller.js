const { Mongoose } = require("mongoose")
const priorityModel =require("../model/priorty-model")

module.exports.addPriority = function(req,res){
    let priorityName=req.body.priorityName
    let isActive=1

    let priority=new priorityModel({
        priorityName:priorityName,
        isActive:isActive
      
    })
    priority.save(function(err,success){
        if(err){
            
            res.json({
                msg:"SMW",
                status:-1,    
                data:"err"
            })
        }else{
            res.json({
                msg:"priority added",
                status:200,
                data:"success"
            })
        }
    })
}

module.exports.getAllpriority=function(req,res){
    priorityModel.find(function(err,success){
        if(err){
            
            res.json({
                msg:"SMW",
                status:-1,
                data: err
            })
        }else{
            res.json({
                msg:"priority listed",
                status:200,
                data:success
            })
        }
    })
}

module.exports.upadatePriorty=function(req,res){
    let priorityId=req.body.priorityId
    let priorityName=req.body.priorityName
    priorityModel.updateOne({_id:priorityId},{priorityName:priorityName},function(err,success){
        if(err){
            
            res.json({
                msg:"SMW",
                status:-1,
                data:err
            })
        }else{
            res.json({
                msg:"priority updated",
                status:200,
                data:success
            })
        }       
    })
}

module.exports.deletePrioty=function(req,res){
    let priorityId=req.params.priorityId
    priorityModel.deleteOne({_id:priorityId},function(err,success){
        if(err){
            
            res.json({
                msg:"SMW",
                status:-1,
                data:err
            })
        }else{
            res.json({
                msg:"priority deleted",
                status:200,
                data:success
            })
        }
    })
}