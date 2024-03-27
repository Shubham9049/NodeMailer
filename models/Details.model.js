const mongoose=require("mongoose")

const detailsSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String},
    addres:{type:String},
    phoneNumber:{type:Number},
    city:{type:String},
    country:{type:String}
})


const detailmodel=mongoose.model("userdetails",detailsSchema)

module.exports={detailmodel}