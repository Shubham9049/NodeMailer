// asyncronous 

const { promises } = require("dns")

// console.log("shubham is good boy")

// setTimeout(()=>{
//     console.log("nitish is good boy")
// },2000)

// console.log("vikash is bad boy")


// drawback of asyncronous 
let a=20
let b=0

// setTimeout(()=>{
//     let b=30
// })

// console.log(a+b)

// we can deal with this drawback using promices

let waitingdata= new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(30)
    },2000)
})

waitingdata.then((data)=>{
let b=data
console.log(a+b)
})