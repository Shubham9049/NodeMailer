const express=require("express")
const routes=express.Router()
const {usermodel}=require("../models/user.model")
const bycrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {verify}=require("../Middleware/Jwt.Auth")
const randomstring=require("randomstring")
const nodemailer=require("nodemailer")
require("dotenv").config()
// const {google}=require("google-auth-library")

const SecretKey="mera_naam_joker"

// const key=randomstring.generate(8)
// const key=randomstring.generate({
//     length: 4,
//     charset: 'numeric'
//   });
// console.log(key)




// nodemailer execution
const transporter= nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
  auth: {
    user:'shubham.rajveer19@gmail.com',
    pass:'oind enrz zmem ckgy',
  }
})


const mailoption=async(name,email,otp)=>{
    const info=await transporter.sendMail({
        from:'shubham.rajveer19@gmail.com',
        to:email,
        subject:"OTP for Registration",
        text:"hello"+name+"your one time otp is "+otp,
        html:`Hello ${name}`+' <a href="http://localhost:5000/user/reset?otp=' + otp + '"<p> Click here to reset your password</p>'
    })
    console.log("Message sent:", info.messageId);
}

routes.get("/",verify,async(req,res)=>{
    try {
        
       const pass="shubham@9975"
       if(!req.query.pass){
        res.send({msg:"please enter password to access data"})
       }
       else if(req.query.pass!=pass){
        res.send({msg:"please enter valid password"})
       }else{
        const data=await usermodel.find()
        res.status(200).json(data)
       }
    
    } catch (error) {
        console.log(error)
    }
})

routes.post("/add",async(req,res)=>{
   try {
    const{name,email,password,phone}=req.body
    const hashedPass=bycrypt.hashSync(password,5)
    const data= new usermodel({name,email,password:hashedPass,phone})
    //   console.log(hashedPass)
    // console.log(data)
    const alreadydata=await usermodel.findOne({email})
    if(!alreadydata){
        data.save()
        res.status(200).send({msg:"data added successfully"})
        // console.log(true)
    }else{
        // console.log(false)
        res.status(200).send({msg:"Email Already Exist try another email"})
    }
   } catch (error) {
   res.status(400).send(error.message)
   }

})
// login
routes.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body
    const userData=await usermodel.findOne({email})
    if(userData){
        const VerifyPass=bycrypt.compareSync(password,userData.password)
        if(VerifyPass){
            res.status(200).send({
                msg:"Login successfully",
                
                status:true,
                token:jwt.sign({_id:userData._id,name:userData.name,role:userData.role},SecretKey),
                user:{
                    username:userData.name,
                    email:userData.email,
                    phone:userData.phone,
                    role:userData.role,
                    password:userData.password
                }
        })
        
        }else{
            res.status(401).send({msg:"Invalid password"})
        }
    }else{
        res.status(400).send({msg:"User not found"})
    }
    } catch (error) {
        console.log(error.message)
    }
})

// updating password
routes.patch("/update",async(req,res)=>{
   try {
    const{email,oldpassword,newpassword}=req.body
    const user=await usermodel.findOne({email})
    if(!user){
        res.status(404).send({msg:"user not found"})
    }
    const isverified=bycrypt.compareSync(oldpassword,user.password)
    if(!isverified){
        res.status(401).send({msg:"Old password is wrong"})
    }else{
        const resetpass=bycrypt.hashSync(newpassword,5)
        await usermodel.updateOne({email},{password:resetpass})
        res.status(200).send({msg:"Password update succesfully"})
    }
   } catch (error) {
    res.status(404).send(error.message)
   }
})

// forget password
routes.post("/forget",async(req,res)=>{
    try {
        const {email}=req.body
        const data=await usermodel.findOne({email})
        if(data){
           let otp=randomstring.generate({
            length:6,
            
           })
             await usermodel.updateOne({email},{otp})
             mailoption(data.name,data.email,otp)
            res.status(200).send({status:true,msg:"check your email for the otp"})
        }else{
            res.status(200).send({status:false,msg:"user not found"})
        }

    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})
// resert password
routes.get("/reset",async(req,res)=>{
    try {
        const otp=req.query.otp
        const user=await usermodel.findOne({otp:otp})
        if(user){
           const {password}=req.body
            const hashedpass=bycrypt.hashSync(password,5)
            await usermodel.findByIdAndUpdate({_id:user._id},{password:hashedpass,opt:""})
            console.log(hashedpass)

            res.status(200).send({status:true,msg:"password reset successfully"})

        }else{
            res.status(200).send({status:false,msg:"otp does not match"})
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports=routes






