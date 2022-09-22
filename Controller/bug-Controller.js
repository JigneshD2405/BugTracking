const BugModel = require("../model/bug-model")


//add [ POST ]
module.exports.addBug = function (req, res) {   

    let bugName = req.body.bugName
    let description = req.body.bugDescription
    let developerId = req.body.developerId
    let testerId = req.body.testerId
    let taskId= req.body.taskId
    let statusId = "626a347da6cc2e3cf3458e3e"

    let bug = new BugModel({
        bugName: bugName,
        description: description,
        developerId: developerId,
        testerId: testerId,
        taskId:taskId,
        statusId:statusId
    })

    bug.save(function (err, data) {
        if (err) {
            
            res.json({ msg: "Something Wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "Bug added", data: data, status: 200 })//http status code 
        }
    })


}
//list
module.exports.getAllBug = function (req, res) {

    BugModel.find().populate("taskId").populate("priorityId").populate("statusId").exec(function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data:err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "bug ret...", data: data, status: 200 })//http status code 
        }
    })
}

//delete
module.exports.deleteBug = function(req,res){
    //params userid 
    let bugId = req.params.bugId //postman -> userid 

    BugModel.deleteOne({_id:bugId},function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "delete...", data: data, status: 200 })//http status code 
        }
    })
}


//update 
module.exports.updateBug= function(req,res){
    //params userid 
    let bugId = req.body.bugId //postman -> userid 
    let bugName = req.body.bugName
    let description=req.body.description
    BugModel.updateOne({_id:bugId},{bugName:bugName},{description:description},function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "bug update...", data: data, status: 200 })//http status code 
        }
    })
}

module.exports.getBugbyTester = function (req, res) {
let testerId=req.params.userId
    BugModel.find({testerId:testerId,statusId:{$ne:"626a34a1a6cc2e3cf3458e42"}}).populate("taskId").populate("priorityId").populate("statusId").exec(function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data:err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "bug ret...", data: data, status: 200 })//http status code 
        }
    })
}

module.exports.getBugTaskbyDeveloper = function (req, res) {
    let userId=req.params.userId
        BugModel.find({developerId:userId,statusId:{$ne:"626a34a1a6cc2e3cf3458e42"}}).populate("taskId").populate("priorityId").populate("statusId").exec(function (err, data) {
            if (err) {
                res.json({ msg: "Somthing went wrong", data:err, status: -1 })//-1  [ 302 404 500 ]
            } else {
                res.json({ msg: "bug ret...", data: data, status: 200 })//http status code 
            }
        })
    }