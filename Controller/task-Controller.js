const TaskModel = require("../model/task-model")



module.exports.addTask = function (req, res) {

    let taskName = req.body.taskName
    let description = req.body.description
    let totalTime = req.body.totalTime
    let moduleId = req.body.moduleId
    let projectId = req.body.projectId
    let statusId = "623ade08578094a882a2ba32"
    let priorityId = req.body.priorityId
    let assigned = false
    let developerId = req.body.developerId
    let testerId = req.body.testerId
    let completionTime = req.body.completionTime
    let bugStatus = req.body.bugStatus


    let d = new Date()
    startDate = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear()

    let task = new TaskModel({
        taskName: taskName,
        description: description,
        totalTime: totalTime,
        startDate: startDate,
        projectId: projectId,
        moduleId: moduleId,
        statusId: statusId,
        priorityId: priorityId,
        assigned: assigned,
        developerId: developerId,
        testerId: testerId,
        completionTime: completionTime,
        bugStatus: bugStatus
    })

    task.save(function (err, data) {
        if (err) {
            res.json({ msg: "something wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "task added", data: data, status: 200 })//http status code 
        }
    })


}

module.exports.getAllTask = function (req, res) {

    TaskModel.find().populate("priorityId").populate("statusId").populate("moduleId").populate("projectId").exec(function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "task Listed", data: data, status: 200 })//http status code 
        }
    })
}


module.exports.deleteTask = function (req, res) {

    let taskId = req.params.taskId

    TaskModel.deleteOne({ _id: taskId }, function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })
        } else {
            res.json({ msg: "delete...", data: data, status: 200 })
        }
    })
}


//update 
module.exports.updateTask = function (req, res) {
    //params userid 

    let taskId = req.body.taskId //postman -> userid 
    let taskName = req.body.taskName
    let description = req.body.description
    let totalTime = req.body.totalTime
    let priorityId = req.body.priorityId
    //console.log(taskId);
    TaskModel.updateOne({ _id: taskId }, { taskName: taskName, description: description, totalTime: totalTime, priorityId: priorityId }, function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "task update...", data: data, status: 200 })//http status code 
        }
    })
}
module.exports.getTaskbyId = function (req, res) {
    let taskId = req.params.taskId

    TaskModel.findOne({ _id: taskId }).populate("priorityId").populate("statusId").populate("developerId").populate("moduleId").populate("projectId").exec(function (err, success) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "task listed by Id", data: success, status: 200 })//http status code 
        }
    })
}
module.exports.getTaskbyModule = function (req, res) {
    let moduleId = req.params.moduleId
    TaskModel.find({ moduleId: moduleId, assigned: false }).populate("statusId").populate("priorityId").populate("moduleId").populate("projectId").exec(function (err, success) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })
        } else {
            res.json({ msg: "task listed by module", data: success, status: 200 })
        }
    })
}
module.exports.getTaskbyStatus = function (req, res) {

    let projectId = req.body.projectId
    let statusId = req.body.statusId
    // console.log(statusId);
    TaskModel.find({ statusId: statusId, projectId: projectId }).populate("priorityId").populate("moduleId").populate("projectId").populate("statusId").exec(function (err, success) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })
        } else {
            res.json({ msg: "task listed by Status", data: success, status: 200 })
        }
    })
}
module.exports.getTaskbyTester = function (req, res) {

    let testerId = req.params.testerId
// console.log(testerId);

    TaskModel.find({ testerId: testerId }).populate("priorityId").populate("moduleId").populate("projectId").populate("statusId").exec(function (err, success) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })
        } else {
            res.json({ msg: "task listed by Tester", data: success, status: 200 })
        }
    })
}
module.exports.noBug = function (req, res) {
    let taskId = req.params.taskId
    TaskModel.find({ _id: taskId }, function (err, success) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })
        }
        else {
            TaskModel.updateOne({ _id: taskId }, { statusId: "623ade3d578094a882a2ba36", bugStatus: "626a34a1a6cc2e3cf3458e42" }, function (err, success) {
                if (err) {
                    res.json({ msg: "Somthing went wrong", data: err, status: -1 })
                } else {
                    res.json({ msg: "task Tested Successfully!", data: success, status: 200 })
                }
            })
        }
    })
}

