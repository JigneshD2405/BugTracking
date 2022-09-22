const { response } = require("express")
const fs = require("fs")
const userModel = require("../model/user-model")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
// function login(req,res){

//     res.write("Login")
//     res.end()
// }

// function signup(req,res){
//     let signupHtml=fs.readFileSync("./views/signup.html")
//     res.write(signupHtml)
//     res.end()
// }

// function saveUser(req,res){
//     console.log(req.body)
//     res.json({
//         msg:"done dana done",
//         status:200,
//         data:req.body
//     })
// }
function sendOtp(req, res) {
    let emailparam = req.body.email
    
    userModel.find({ email: emailparam }, function (err, data) {
        
        if (err) {
            res.json({
                status: -1,
                msg: "enter Valid eMail",
                data: err
            })
        } else {
            if (data.length != 0) {
                let myotp = parseInt(Math.random() * 1000000)
                userModel.updateOne({ email: emailparam }, { otp: myotp }, function (err, success) {
                    let transport = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: "bugtrackingsystem2@gmail.com",
                            pass: "Bugtracking041"
                        }
                    });
                    let info = {
                        from: "bugtrackingsystem2@gmail.com",
                        to: emailparam,
                        subject: "forgot Password",
                        text: "Hey,your one time password is:" + myotp,
                    };
                    
                    transport.sendMail(info, function (err, success) {
                       
                        if (err) {
                            res.json({
                                status: -1,
                                data: err,
                                msg: "Something went wrong"
                            })

                        } else {
                            res.json({
                                status: 200,
                                msg: "otp sent to your mail",
                                data: success
                            })
                        }
                    });


                })
            } else {
                res.json({
                    status: -1,
                    data: err,
                    msg: "Invalide email"
                })

            }
        }

    })
}

function otpverification(req, res) {
    let emailparam = req.body.email
    let otpparam = req.body.otp
    let passparam = req.body.pass
    let confirmpass = req.body.cpass
    userModel.findOne({ email: emailparam }, function (err, data) {
        if (err) {
            res.json({
                msg: "Some thing went wrong",
                status: -1,
                data: err
            })
        } else {
             
            if (data.otp == otpparam) {
                if (passparam == confirmpass) {
                    let encpassword = bcrypt.hashSync(passparam, 10)
                    userModel.updateOne({ email: emailparam }, { otp: "", password: encpassword }, function (err, success) {
                        if (err) {
                            res.json({ msg: "Something Wrong!", status: -1, data: err })
                        }
                        else {
                            res.json({ msg: "Password Changed", status: 200, data: success })
                        }
                    })
                } else {
                    res.json({ msg: "new password and confirm password is not matched", status: -1, data: err })
                }
            } else {
                res.json({ msg: "Invalid OTP", status: -1, data: err })
            }
        }
    })
}

// module.exports.login=login
// module.exports.signup=signup 
// module.exports.saveUser=saveUser
module.exports.sendOtp = sendOtp
module.exports.otpverification = otpverification