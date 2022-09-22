const statusModel = require("../model/status_model")

module.exports.addStatus=function(req,res){
    let statusName=req.body.statusName
    let isActive=1
   
    let status = new statusModel({
        statusName:statusName,
        isActive:isActive
    }) 
    status.save(function(err,success){
        if(err){
            res.json({
            msg:"somethig went wrong",
            data:err,
            status:-1
            })
        }else{
            res.json({
                msg:"status added",
                data:success,
                status:200
                })
        }
        
    })
}

module.exports.getAllStatus=function(req,res){
    statusModel.find(function(err,success){
        if(err){
            res.json({
            msg:"somethig went wrong",
            data:err,
            status:-1
            })
        }else{
            res.json({
                msg:"status listed",
                data:success,
                status:200
                })
        }
        
    })
}

module.exports.upadateStatus=function(req,res){
    let statusId= req.body.statusId
    let statusName =req.body.statusName
    statusModel.updateOne({_id:statusId},{statusName:statusName},function(err,success){
        if(err){
            res.json({
            msg:"somethig went wrong",
            data:err,
            status:-1
            })
        }else{
            res.json({
                msg:"status upadate",
                data:success,
                status:200
                })
        }
    })
}

module.exports.deleteStatus=function(req,res){
let statusId =req.params.statusId

    statusModel.deleteOne({_id:statusId},function(err,success){
        if(err){
            res.json({
            msg:"somethig went wrong",
            data:err,
            status:-1
            })
        }else{
            res.json({
                msg:"status deleted",
                data:success,
                status:200
                })
        }
    })
}