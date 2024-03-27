const express=require("express")
const {ConnectDB}=require("./DBConnect/db")
const userRoutes=require("./Routes/user.route")
const detailRoute=require("./Routes/details.route")
// const middleware=require("./middleware")

// const routes=express.Router()

const app=express()

app.use(express.json())

app.use("/user",userRoutes);
app.use("/details",detailRoute);

// routes.use(middleware)
// app.get("/", middleware,(req,res)=>{
//     // res.send("welcome to the front page")
//     // // res.json("this is a json file")
//     // // res.status(400).send("bad request")
//     try {
//         res.send("welcome to the front page")
//     } catch (error) {
//         console.log(error.messge)
//     }
// })

// app.get("/user",(req,res)=>{
//     res.send("welcome to the user page")
// })
// routes.get("/about",(req,res)=>{
//     res.send("this is about page")
// })
// routes.get("/contact",(req,res)=>{
//     res.send("this is contact page")
// })

// app.use("/",routes)







app.listen(5000,async()=>{
    await ConnectDB()
    console.log("server is listening at port 5000")
})