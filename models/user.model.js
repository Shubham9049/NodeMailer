const mongoose=require("mongoose")

let userschema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    phone:{
        type:Number
    },
    role:{
        type:String,
        default:"user"
    },
    otp:{
        type:String,
        default:""
    }
})

const usermodel=mongoose.model("user",userschema)

module.exports={usermodel}