


const RoleModel=require("../model/role-model")


module.exports.addRole = function(req,res){
    console.log(req.body.roleName);
     
    let role =new RoleModel({
         roleName:req.body.roleName
     })


role.save(function(err,success){
    if (err){
        console.log(err);
        res.json({msg:"something went Wrong",status:-1,data:req.body})
    }else{
        res.json({msg:"role added",status:200,data:success})
    }
})

}

module.exports.getAllRoles = function(req,res){
    RoleModel.find(function(err,success){
        if(err){
            res.json({
                msg:"Something went wrong",
                data:err,
                status:-1
            })
        }else{
            res.json({
                msg:"Role ret...",
                data:success,
                status:200
            })
        }
    })
}
module.exports.deleteRole=function(req,res){
    let roleId=req.params.roleId

    RoleModel.deleteOne({"_id":roleId},function(err,data){
        if(err){
            res.json({
                msg:"Something went wrong",
                data:err,
                status:-1
            })
        }else{
            res.json({
                msg:"Role Deleted.",
                data:data,
                status:200
            })
        }
    })
}

module.exports.updateRole = function(req,res){
    let roleId=req.body.roleId
    let roleName=req.body.roleName
    console.log(roleName);
    RoleModel.updateOne({_id:roleId},{roleName:roleName},function(err,success){
        if(err){
            res.json({
                msg:"Something went wrong",
                data:err,
                status:-1
            })
        }else{
            console.log(success);
            res.json({
                msg:"Role updated",
                data:success,
                status:200
            })
        }
    })

}
module.exports.getRolesbyId = function(req,res){
    let roleId= req.params.roleId
   // console.log(roleId)
    RoleModel.findOne({_id:roleId},function(err,success){
        if(err){
            console.log(err)
            res.json({
                msg:"Something went wrong",
                data:err,
                status:-1
            })
        }else{
            res.json({
                msg:"Role ret...",
                data:success,
                status:200
            })
        }
    })
}