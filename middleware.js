const appfilter=(req,res,next)=>{
    if(!req.query.age){
        console.log("appfilter")
      res.send("please provide age")
    }else if(req.query.age<18){
        res.status(400).send("Your eligible to access this page")
    }else{
        next()
    }
    }


    module.exports=appfilter