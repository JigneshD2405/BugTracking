const mongoose=require("mongoose")

const moduleUserSchema =new mongoose.Schema({
    moduleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"module"
        },
    moduleUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
})
const moduleUserModel=mongoose.model("moduleUser",moduleUserSchema)
module.exports=moduleUserModel