const express=require("express")
const detailRoute=express.Router()
const {detailmodel}=require("../models/Details.model")
const {verify,verifyAdmin}=require("../Middleware/Jwt.Auth")


detailRoute.get("/",verify,async(req,res)=>{
    try {
        const data=await detailmodel.find()
        res.json(data)
    } catch (error) {
        console.log(error.message)
    }
})


detailRoute.post("/",verifyAdmin,async(req,res)=>{
   try {
    const{name,email,addres,phoneNumber,city,country}=req.body
    const data=new detailmodel({name,email,addres,phoneNumber,city,country})
    await data.save()
    res.status(200).send({result:"Details added successfully"})
   } catch (error) {
    console.log(error.message)
   }
})





module.exports= detailRoute