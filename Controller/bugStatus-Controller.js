const bugStatusModel = require("../model/bugStatus-model")

module.exports.addBugStatus=function(req,res){
    let statusName=req.body.statusName
   
    let status = new bugStatusModel({
        statusName:statusName,
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
                msg:"Bugstatus added",
                data:success,
                status:200
                })
        }
        
    })
}

module.exports.getAllBugStatus=function(req,res){
    bugStatusModel.find(function(err,success){
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
