const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")


const SessionController = require("./Controller/Session.Controller")
const roleController=require("./Controller/role-Controller")
const userController=require("./Controller/user-Controller")
const statusController=require("./Controller/status-Controller")
const priorityController=require("./Controller/priority-Controller")
const projectController=require("./Controller/project-Controller")
const projectTeamController=require("./Controller/projectTeam-Controller")
const moduleController=require("./Controller/Module-Controller")
const taskController=require("./Controller/task-Controller")
const taskUserController=require("./Controller/taskUser-Controller")
const bugController=require("./Controller/bug-Controller")
const moduleUserController =require("./Controller/moduleUser-Controller")
const bugStatusController=require("./Controller/bugStatus-Controller")

const { application } = require("express")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://localhost:27017/BugTracking',function(err){
    if(err){
     console.log("db connection fail....");
     console.log(err);
    }else{
     console.log("db connected...");
    }
})




app.get("/",function(req,res){
    res.write("welcom.....")
    res.end()
})
//session
// app.get("/login",SessionController.login)
// app.get("/signup",SessionController.signup)
// app.post("/userSave",SessionController.saveUser)
app.post("/sendOtp",SessionController.sendOtp)
app.put("/otpverification",SessionController.otpverification)
//role
app.post("/roles",roleController.addRole)
app.get("/roles",roleController.getAllRoles)
app.delete("/roles/:roleId",roleController.deleteRole) 
app.put("/roles",roleController.updateRole)
app.get("/role/:roleId",roleController.getRolesbyId)

//user
app.post("/users",userController.addUser)
app.get("/users",userController.getAllUsers)
app.put("/users",userController.updateUser)
app.delete("/users/:userId",userController.deleteUser)
app.post("/login",userController.login)
app.get("/Manager",userController.getAllManager)
app.get("/pendingUser",userController.pendingUser)
app.put("/approvedUser",userController.approveUser)
app.get("/developer",userController.getAllDeveloper)
app.get("/tester",userController.getAllTester)
app.get("/Managers",userController.getAllManagers)
app.get("/userByuserId/:userId",userController.getUserById)
app.get("/getUserByRole/:role",userController.getUserByRole)
app.get("/getDeveloper",userController.getDeveloper)

//taskUser
app.post("/taskusers",taskUserController.addTaskUser)
app.get("/taskusers",taskUserController.getAllTaskUser)
app.delete("/taskusers/:taskUser",taskUserController.deleteTaskUser)
app.get("/getTaskbyDeveloper/:developerId",taskUserController.getTaskBydeveloper)
app.post("/submitTask",taskUserController.submitTask)
app.get("/getPendingTaskbyDeveloper/:userId",taskUserController.getPendingTaskbyDeveloper)
//bug
app.post("/bugs",bugController.addBug)
app.get("/bugs",bugController.getAllBug)
app.delete("/bugs",bugController.deleteBug)
app.put("/bugs",bugController.updateBug)

//status
app.post("/status",statusController.addStatus)
app.get("/status",statusController.getAllStatus)
app.put("/status",statusController.upadateStatus)
app.delete("/status/:statusId",statusController.deleteStatus)

//priority
app.post("/priority",priorityController.addPriority)
app.get("/priority",priorityController.getAllpriority)
app.put("/priority",priorityController.upadatePriorty)
app.delete("/priority/:priorityId",priorityController.deletePrioty)

//project 
app.post("/project",projectController.addProject)
app.get("/project",projectController.getAllProject)
app.put("/projects",projectController.upadateproject)
app.delete("/project/:projectId",projectController.deleteProject)
app.get("/projects/:projectId",projectController.getProjectbyId)
app.get("/pendingProject",projectController.pendingProject)
app.get("/complatedProject",projectController.complateProject)
app.get("/getProjectName/:projectId",projectController.getProjectName)
app.get("/getProjectbyStatus/:statusId",projectController.getProjectbyStatus)
app.get("/getProjectBymanager/:projectManagerId",projectController.getProjectBymanager)
app.put("/upadateprojectStatus",projectController.upadateprojectStatus)
app.get("/complateProjectofPm/:projectManagerId",projectController.complateProjectofPm)
app.get("/pendingProjectforPm/:projectManagerId",projectController.pendingProjectforPm)
app.get("/getpendingprojectforPm/:projectManagerId",projectController.getpendingprojectforPm)



//project_team
app.post("/projectTeam",projectTeamController.addProjectTeam)
app.get("/projectTeam/:projectId",projectTeamController.getAllProjectTeam)
app.put("/projectTeam",projectTeamController.upadateprojectTeam)
app.delete("/projectTeam/:projectTeamId",projectTeamController.DeleteProjectTeam)
app.get("/disableMember/:userId",projectTeamController.disableUserForProject)
app.get("/getProjectbyDeveloper/:developerId",projectTeamController.getProjectForDev)
app.get("/getTesterbyProject/:projectId",projectTeamController.getTesterbyProject)
//module
app.get("/module",moduleController.getAllModule)
app.put("/modules",moduleController.UpdateModule)
app.post("/module",moduleController.addModule)
app.delete("/module/:moduleId",moduleController.deleteModule)
app.get("/modules/:moduleId",moduleController.getModuleById)
app.get("/modules",moduleController.getmoduleproject)
app.get("/getmodulebyproject/:projectId",moduleController.getModulebyproject)
app.get("/getModulebyStatus/:statusId",moduleController.getModulebyStatus)
//task
app.get("/task",taskController.getAllTask)
app.post("/task",taskController.addTask)
app.put("/task",taskController.updateTask)
app.delete("/task/:taskId",taskController.deleteTask)
app.get("/gettaskbyId/:taskId",taskController.getTaskbyId)
app.get("/taskByModule/:moduleId",taskController.getTaskbyModule)
app.post("/gettaskbyStatus",taskController.getTaskbyStatus)
app.get("/getTaskbyTester/:testerId",taskController.getTaskbyTester)
app.get("/noBug/:taskId",taskController.noBug)
app.get("/getBugbyTester/:userId",bugController.getBugbyTester)
app.get("/getBugTaskbyDeveloper/:userId",bugController.getBugTaskbyDeveloper)
//moduleUser
app.post("/addmoduleUser",moduleUserController.addModuleUser)
app.get("/getAllModuleUser",moduleUserController.getAllModuleUser)
app.delete("/deleteModules/:moduleId",moduleUserController.deleteModules)
app.get("/getModulebyProjectManager/:projectManagerId",moduleUserController.getModulebyProjectManager)

//bug status
app.post("/addBugStatus",bugStatusController.addBugStatus)
app.get("/getAllBugStatus",bugStatusController.getAllBugStatus)

app.listen(3000,function(){
    console.log("Server started on 3000")
})