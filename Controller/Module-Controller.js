const { response } = require("express")
const { populate } = require("../model/module-model")
const moduleModel = require("../model/module-model")
const modulemodel = require("../model/module-model")

module.exports.addModule =function(req,res){
    let moduleName = req.body.moduleName
    let description = req.body.description
    let estimatedHour=req.body.estimatedHours
    let projectId=req.body.projectId
    let priorityId=req.body.priorityId
    let statusId = "623ade08578094a882a2ba32"

    let d = new Date()
    startDate = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear()

    let module =new modulemodel({
        moduleName:moduleName,
        description:description,
        estimatedHour:estimatedHour,
        startDate:startDate,
        projectId:projectId,
        priorityId:priorityId,
        statusId:statusId
    })
    module.save(function (err, success) {
        if (err) {

            res.json({
                msg: "Something went wrong",
                data: err,
                status: -1
            })
        } else {
            res.json({
                msg: "module Added",
                data: success,
                status: 200
            })
        }
    })
}
module.exports.getAllModule=function(req,res){
    modulemodel.find().populate("priorityId").populate("projectId").populate("statusId").exec(function(err,success){
        if(err){
            console.log(err);
            res.json({
                msg:"Something wrong",
                data:err,
                status:-1
            })
        }else{
            res.json({
                msg:"Module Listed",
                data:success,
                status:200
            })
        }
   })
}
module.exports.UpdateModule= function(req,res){
    let moduleName = req.body.moduleName
    let description = req.body.description
    let estimatedHour=req.body.estimatedHours
    let projectId=req.body.projectId
    let priorityId=req.body.priorityId 
    let moduleId=req.body.moduleId
        
    modulemodel.updateOne({_id:moduleId},{description:description,estimatedHour:estimatedHour,startDate:startDate,projectId:projectId,priorityId:priorityId,moduleName:moduleName},function(err,success){
        if(err){
            res.json({
                msg:"SMW",
                data:err,
                status:-1
            })
        }else{
            res.json({
                msg:"Module Upadated",
                data:success,
                status:200
            })
        }       
    })

}
module.exports.deleteModule=function(req,res){
    let moduleId=req.params.moduleId
    modulemodel.deleteOne({_id:moduleId},function(err,success){
        if(err){
            res.json({
                msg:"SMW",
                data:err,
                status:-1
            })
        }else{
            res.json({
                msg:"Module deleted",
                data:success,
                status:200
            })
        }       
    })
}
module.exports.getModuleById=function(req,res){
    let moduleId =req.params.moduleId
    //console.log(moduleId);
    modulemodel.findOne({_id:moduleId}).populate("projectId").populate("priorityId").exec(function(err,success){
        if(err){
            res.json({
                msg:"SMW",
                data:err,
                status:-1
            })
        }else{
            //console.log(success);
            res.json({
                msg:"Module Listd by Id",
                data:success,
                status:200
            })
        }
    })
}
module.exports.getmoduleproject=function(req,res){
    let projectId =req.params.projectId
    modulemodel.find({projectId:projectId}).populate("projectId").exec(function(err,success){
        if(err){
            res.json({
                msg:"SMW",
                status:-1,
                data:err
            })
        }else{
            res.json({
                msg:"Module by Project",
                status:200,
                data:success
            })
        }
    })
}
module.exports.getModulebyproject= function(req,res){
    let projectId=req.params.projectId
  modulemodel.find({projectId:projectId}).populate("projectId").populate("priorityId").populate("statusId").exec(function(err,success){
    if(err){
        res.json({
            msg:"SMW",
            status:-1,
            data:err
        })
    }else{
        res.json({
            msg:"Module by Project",
            status:200,
            data:success
        })
    }
  })   
}
module.exports.getModulebyStatus= function(req,res){
    let statusId=req.params.statusId

  modulemodel.find({statusId:statusId}).populate("projectId").populate("priorityId").populate("statusId").exec(function(err,success){
    if(err){
        res.json({
            msg:"SMW",
            status:-1,
            data:err
        })
    }else{
        res.json({
            msg:"Module by Status",
            status:200,
            data:success
        })
    }
  })   
}