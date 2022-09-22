const userModel = require("../model/user-model")
const bcrypt = require("bcrypt")

module.exports.addUser = function (req, res) {
    let userName = req.body.userName
    let email = req.body.email
    let password = req.body.password
    let Gender = req.body.Gender
    let role = req.body.role
    let isActive = false
    let status = "Pending"
    let projectAssign=false
    let activeProject=false

    let enPassword = bcrypt.hashSync(password, 10)

    let user = new userModel({
        userName: userName,
        email: email,
        Gender: Gender,
        password: enPassword,
        role: role,
        isActive: isActive,
        status: status,
        projectAssign:projectAssign,
        activeProject:activeProject
    })


    user.save(function (err, success) {
        if (err) {
            res.json({
                msg: "somethig went wrong",
                data: err,
                status: -1
            })
        } else {

            res.json({
                msg: "user added",
                data: success,
                status: 200
            })
        }

    })
}

module.exports.getAllUsers = function (req, res) {
    userModel.find({ status: "Approved" }).populate("role").exec(function (err, success) {
        if (err) {
            res.json({
                msg: "somethig went wrong",
                data: err,
                status: -1
            })
        } else {
            res.json({
                msg: "User listed",
                data: success,
                status: 200
            })
        }
    })
}

module.exports.updateUser = function (req, res) {
    userModel.updateOne(function (err, success) {

        if (err) {
            res.json({
                msg: "somethig went wrong",
                data: err,
                status: -1
            })
        } else {
            res.json({
                msg: "user upadated",
                data: success,
                status: 200
            })
        }
    })
}

module.exports.deleteUser = function (req, res) {
    let userId = req.params.userId
    
    userModel.deleteOne({ _id: userId }, function (err, success) {
        if (err) {
            res.json({
                msg: "somethig went wrong",
                data: err,
                status: -1
            })
        } else {
            res.json({
                msg: "user Deleted",
                data: success,
                status: 200
            })
        }
    })
}

//login

module.exports.login = function (req, res) {
    let param_email = req.body.email
    let param_password = req.body.password

    let isCorrect = false

    userModel.findOne({ email: param_email }).populate("role").exec(function (err, data) {
        if (data.isActive==true) {
            let ans = bcrypt.compareSync(param_password, data.password)
            if (ans == true) {
                isCorrect = true
            }
        } if (isCorrect == true) {
            res.json({ msg: "Login", data: data, status: 200 })
        } else {
            res.json({ msg: "User is not Approved", data: err, status: -1 })
        }
    })

}

module.exports.getAllManager = function (req, res) {
    userModel.find({ role: "624a87f3094d03c760cc8628" }).populate("role").exec(function (err, success) {
        if (err) {
            res.json({
                msg: "somethig went wrong",
                data: err,
                status: -1
            })
        } else {
            res.json({
                msg: "Manager Listed",
                data: success,
                status: 200
            })
        }
    })
}
module.exports.pendingUser = function (req, res) {

    userModel.find({ isActive: false }).populate("role").exec(function (err, success) {

        if (err) {
            res.json({
                msg: "somethig went wrong",
                data: err,
                status: -1
            })
        } else {
            res.json({
                msg: "Pending UserListed",
                data: success,
                status: 200
            })
        }
    })
}
module.exports.approveUser = function (req, res) {
    let userId = req.body.userId
    userModel.updateOne({ _id: userId }, { isActive: true, status: "Approved" }, function (err, success) {

        if (err) {
            res.json({
                msg: "somethig went wrong",
                data: err,
                status: -1
            })
        } else {
            res.json({
                msg: "User Approved",
                data: success,
                status: 200
            })
        }
    })
}
module.exports.getAllDeveloper= function (req, res) {
    userModel.find({ role: "6242af4d3329d01fcef3ba82",projectAssign:false,isActive:true}).populate("role").exec(function (err, success) {
        if (err) {
            res.json({
                msg: "somethig went wrong",
                data: err,
                status: -1
            })
        } else {
            res.json({
                msg: "Developer Listed",
                data: success,
                status: 200
            })
        }
    })
}
module.exports.getAllTester= function (req, res) {
    userModel.find({ role: "62301c00e893ddb39f6e522d",projectAssign:false,isActive:true }).populate("role").exec(function (err, success) {
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
module.exports.getAllManagers = function (req, res) {
    userModel.find({ role: "624a87f3094d03c760cc8628",projectAssign:false }).populate("role").exec(function (err, success) {
        if (err) {
            res.json({
                msg: "somethig went wrong",
                data: err,
                status: -1
            })
        } else {
            res.json({
                msg: "Manager Listed",
                data: success,
                status: 200
            })
        }
    })
}
module.exports.getUserById = function (req, res) {
    let userId=req.params.userId
    userModel.findOne({ _id:userId },function (err, success) {
        if (err) {
            res.json({
                msg: "somethig went wrong",
                data: err,
                status: -1
            })
        } else {
            res.json({
                msg: "",
                data: success,
                status: 200
            })
        }
    })
}
module.exports.getUserByRole= function (req, res) {
    let role=req.params.role
    
    userModel.find({ role :role },function (err, success) {
        if (err) {
            res.json({
                msg: "somethig went wrong",
                data: err,
                status: -1
            })
        } else {
            res.json({
                msg: "User By Role",
                data: success,
                status: 200
            })
        }
    })
}
module.exports.getDeveloper= function (req, res) {
    userModel.find({ role: "6242af4d3329d01fcef3ba82",isActive:true}).populate("role").exec(function (err, success) {
        if (err) {
            res.json({
                msg: "somethig went wrong",
                data: err,
                status: -1
            })
        } else {
            res.json({
                msg: "Developer Listed",
                data: success,
                status: 200
            })
        }
    })
}

 