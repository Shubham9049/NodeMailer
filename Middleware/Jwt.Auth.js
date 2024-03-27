const jwt=require("jsonwebtoken")
const SecretKey="mera_naam_joker"

const verify=async(req,res,next)=>{
try {
    const token=req.headers.authorization
    const isVerified=jwt.verify(token,SecretKey)
    if(isVerified){
        console.log(isVerified)
        req.user={...isVerified}
        req.body.userId=isVerified.id
        next()
    }else{
        res.status(200).send({msg:"something went wrong"})
    }
} catch (error) {
    console.log(error.message,"something went wrong"),
    res.status(400).send({msg:"Jwt must be provided"})
}
}

const verifyAdmin=async(req,res,next)=>{
    try {
        const token=req.headers.authorization
        const isVerified=jwt.verify(token,SecretKey)
        if(isVerified){
            console.log(isVerified)
            req.user={...isVerified}
           if(req.body.role=isVerified.role=="admin"){
            next()
           }else{
            return res.status(200).send({msg:"Unauthorized"})
           }
        }

    } catch (error) {
        console.log(error.message)
    }
}


module.exports={verify,verifyAdmin}