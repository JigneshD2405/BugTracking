const mongoose =require ("mongoose")


const userSchema = new mongoose.Schema({
    userName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    Gender:{
        type:String
    },

    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"role"
    },otp:{
        type:String
    },
    isActive:{
        type:Boolean
    },
    status:{
        type:String
    },
    projectAssign:{
        type:Boolean
    },
    activeProject:{
        type :Boolean
    }
    


})

const userModel =mongoose.model("user",userSchema)

module.exports=userModel