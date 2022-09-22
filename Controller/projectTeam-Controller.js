const projectTeamModel = require("../model/project_team-model")
const  userModel=require("../model/user-model")

module.exports.addProjectTeam = function (req, res) {
    let projectId = req.body.projectId
    let projectTeamStatusId = true
    let projectTeamMember = req.body.projectTeamMember
    let role = req.body.role

    let projectTeam = new projectTeamModel({
        projectId: projectId,
        projectTeamStatusId: true,
        projectTeamMember: projectTeamMember,
        role: role
    })

    projectTeam.save(function (err, success) {
        if (err) {
            res.json({
                msg: "SMW",
                data: err,
                status: -1
            })
        } else {
          userModel.updateOne({_id:projectTeamMember},{projectAssign:true},function(err,success){
            if (err) {
                res.json({
                    msg: "SMW",
                    data: err,
                    status: -1
                })
            } else {
                res.json({
                    msg: "Project Team Added",
                    data: success,
                    status: 200
                })
            }
          })
        }
    })
}

module.exports.getAllProjectTeam = function (req, res) {
    let projectId = req.params.projectId
    projectTeamModel.find({ projectId: projectId }).populate("projectId").populate("projectTeamMember").populate("role").exec(function (err, success) {
        if (err) {
            res.json({
                msg: "SMW",
                data: err,
                status: -1
            })
        } else {
            res.json({
                msg: "Project Team listed",
                data: success,
                status: 200
            })
        }
    })
}

module.exports.upadateprojectTeam = function (req, res) {
    let projectTeamName = req.body.projectTeamName
    let statusId = req.body.statusId
    let userId = req.body.userId
    let projectTeamId = req.body.projectTeamId

    projectTeamModel.updateOne({ _id: projectTeamId }, { projectTeamName: projectTeamName }, { userId: userId }, { statusId: statusId }, function (err, success) {
        if (err) {
            res.json({
                msg: "SMW",
                data: err,
                status: -1
            })
        } else {
            res.json({
                msg: "Project Team Updated",
                data: success,
                status: 200
            })
        }
    })
}

module.exports.DeleteProjectTeam = function (req, res) {
    let projectTeamId = req.params.projectTeamId
    projectTeamModel.deleteOne({ _id: projectTeamId }, function (err, success) {
        if (err) {
            res.json({
                msg: "SMW",
                data: err,
                status: -1
            })
        } else {
            res.json({
                msg: "Project Team Deleted",
                data: success,
                status: 200
            })
        }
    })
}
module.exports.disableUserForProject = function (req, res) {
    let userId = req.params.userId
    
    projectTeamModel.findOne({ projectTeamMember: userId }, function (err, data) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
    
        else {
            
            if (data.projectTeamStatusId == true) {
                projectTeamModel.updateOne({ projectTeamMember: userId }, { projectTeamStatusId: false }, function (err, data1) {
                    res.json({ msg: "Revoke Successfully", status: 200, data: data })
            
                })
            }
            else if (data.projectTeamStatusId == false) {
                projectTeamModel.updateOne({ projectTeamMember: userId }, { projectTeamStatusId: true }, function (err, data) {
                    res.json({ msg: "Activated Successfully", status: 200, data: data })
                })
            }
            else {
                res.json({ msg: "Something Wrong", status: -1, data: req.body })
            }
        }
    })
} 
module.exports.getProjectForDev=function(req,res){
    let developerId=req.params.developerId
    // console.log(developerId);
    projectTeamModel.find({projectTeamMember:developerId}).populate("projectId").populate("role").exec(function (err, success) {
        if (err) {
            res.json({
                msg: "SMW",
                data: err,
                status: -1
            })
        } else {
            res.json({
                msg: "Project by developer",
                data: success,
                status: 200
            })
        }
    })
}
module.exports.getTesterbyProject= function (req, res) {
    let projectId=req.params.projectId
    projectTeamModel.find({ projectId:projectId,role:"62301c00e893ddb39f6e522d"}).populate("role").populate("projectTeamMember").exec(function (err, success) {
        if (err) {
            res.json({
                msg: "somethig went wrong",
                data: err,
                status: -1
            })
        } else {
            res.json({
                msg: "Tester Listed",
                data: success,
                status: 200
            })
        }
    })
}