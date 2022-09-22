const mongoose = require("mongoose")

let RoleSchema = new mongoose.Schema({
    roleName:{
        type:String
    }
})

let  RoleModel=mongoose.model("role",RoleSchema)

module.exports=RoleModel
