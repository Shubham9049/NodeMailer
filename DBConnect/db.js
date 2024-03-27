const mongoose=require("mongoose")
require("dotenv").config()
const ConnectDB=async()=>{
    try {
        await mongoose.connect(process.env.mongoURL)
        console.log("connect to DB")
    } catch (error) {
        console.log(error.message)
    }
}


module.exports={ConnectDB}