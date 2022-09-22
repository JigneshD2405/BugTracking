const { response } = require("express")
const projectModel = require("../model/project-model")

module.exports.addProject = function (req, res) {
    let projectName = req.body.projectName
    let description = req.body.description
    let projectManagerId = req.body.projectManagerId
    let technology = req.body.technology
    let statusId = "623ade08578094a882a2ba32"
    let estimatedHour = req.body.estimatedHour
    let d = new Date()
    startDate = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear()

    let project = new projectModel({
        projectName: projectName,
        description: description,
        projectManagerId: projectManagerId,
        technology: technology,
        statusId: statusId,
        estimatedHour: estimatedHour,
        startDate: startDate
    })

    project.save(function (err, success) {
        if (err) {

            res.json({
                msg: "SMW",
                data: err,
                status: -1
            })
        } else {
            res.json({
                msg: "Project",
                data: success,
                status: 200
            })
        }
    })
}

module.exports.getAllProject = function (req, res) {
    projectModel.find().populate("statusId").populate("projectManagerId").exec(function (err, success) {
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


module.exports.upadateproject = function (req, res) {
    let projectId = req.body.projectId
    let projectName = req.body.projectName
    let description = req.body.description
    let projectManagerId = req.body.projectManagerId
    let statusId = req.body.statusId
    let estimatedHour = req.body.estimatedHour
    let technology = req.body.technology
    projectModel.updateOne({ _id: projectId }, { projectName: projectName , description: description, projectManagerId: projectManagerId, statusId: statusId, estimatedHour: estimatedHour, technology: technology }, function (err, success) {
        if (err) {
            res.json({
                msg: "SMW",
                data: err,
                status: -1
            })
        } else {

            res.json({
                msg: "Project Updated....",
                data: success,
                status: 200
            })
        }
    })
}

module.exports.deleteProject = function (req, res) {
    let projectId = req.params.projectId
    projectModel.deleteOne({ _id: projectId }, function (err, success) {
        if (err) {
            res.json({
                msg: "SMW",
                data: err,
                status: -1
            })
        } else {
            res.json({
                msg: "project deleted",
                data: success,
                status: 200
            })
        }
    })
}
module.exports.getProjectbyId = function (req, res) {
    let projectId = req.params.projectId
    projectModel.findOne({ _id: projectId }).populate("projectManagerId").exec(function (err, success) {
        if (err) {
            response.json({
                msg: "SMW",
                data: err,
                status: -1
            })
        } else {

            //console.log(res.success);
            res.json({
                msg: "project Listed by Project ID",
                data: success,
                status: 200
            })
        }
    })
}

module.exports.pendingProject=function(req,res){
    projectModel.find({statusId:{$ne:"623ade3d578094a882a2ba36"}}).populate("projectManagerId").populate("statusId").exec(function(err,success){

        if (err) {
            response.json({
                msg: "SMW",
                data: err,
                status: -1
            })
        } else {

            
            res.json({
                msg: "Pending Projects Are Listed",
                data: success,
                status: 200
            })
        }
    })
}

module.exports.complateProject=function(req,res){
    projectModel.find({statusId:"623ade3d578094a882a2ba36"}).populate("projectManagerId").populate("statusId").exec(function(err,success){
        if (err) {
            response.json({
                msg: "SMW",
                data: err,
                status: -1
            })
        } else {

          
            res.json({
                msg: "Complated Projects Are Listed",
                data: success,
                status: 200
            })
        }
    })
}
module.exports.getProjectName=function(req,res){
    let projectId =req.params.projectId
    projectModel.find({_id:projectId},function(err,success){
        if (err) {
            response.json({
                msg: "SMW",
                data: err,
                status: -1
            })
        } else {

          
            res.json({
                msg: "Data Retrive",
                data: success,
                status: 200
            })
        }
    })
}
module.exports.getProjectbyStatus = function (req, res) {
    let statusId=req.params.statusId
    projectModel.find({statusId:statusId}).populate("statusId").populate("projectManagerId").exec(function (err, success) {
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
module.exports.getProjectBymanager = function (req, res) {
    let projectManagerId=req.params.projectManagerId
    projectModel.find({projectManagerId:projectManagerId}).populate("statusId").populate("projectManagerId").exec(function (err, success) {
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
module.exports.upadateprojectStatus = function (req, res) {
    let projectId = req.params.projectId
    console.log(projectId);
            projectModel.updateOne( {projectId:projectId},{ statusId: "623ade3d578094a882a2ba36" }, function (err, success) {
                if (err) {
                    res.json({
                        msg: "SMW",
                        data: err,
                        status: -1
                    })
                } else {
        
                    res.json({
                        msg: "Project Updated....",
                        data: success,
                        status: 200
                    })
                }
            })
        
    
   
}
module.exports.complateProjectofPm=function(req,res){
    let projectManagerId=req.params.projectManagerId
    
    projectModel.find({projectManagerId:projectManagerId ,statusId:"623ade3d578094a882a2ba36"}).populate("projectManagerId").populate("statusId").exec(function(err,success){
        if (err) {
            response.json({
                msg: "SMW",
                data: err,
                status: -1
            })
        } else {

            
            res.json({
                msg: "Complated Projects Are Listed",
                data: success,
                status: 200
            })
        }
    })
}
module.exports.pendingProjectforPm=function(req,res){
    let projectManagerId=req.params.projectManagerId
    projectModel.find({projectManagerId:projectManagerId,statusId:{$ne:"623ade3d578094a882a2ba36"}}).populate("projectManagerId").populate("statusId").exec(function(err,success){

        if (err) {
            response.json({
                msg: "SMW",
                data: err,
                status: -1
            })
        } else {

            
            res.json({
                msg: "Pending Projects Are Listed",
                data: success,
                status: 200
            })
        }
    })
}
module.exports.getpendingprojectforPm = function (req, res) {
    let projectManagerId=req.params.projectManagerId
    projectModel.find({projectManagerId:projectManagerId,statusId:"623ade08578094a882a2ba32"}).populate("statusId").populate("projectManagerId").exec(function (err, success) {
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
