const express=require("express");
const db=require("./config/database")
const app=express();

const port=4623

app.post("/signup",(req,res)=>{

})

db().then(()=>{
    console.log("Db connect vayo")
    app.listen(port,()=>{
        console.log(`listening on port ${port}`)
    })

}).catch((err)=>{
    console.log("Db connect vayena")
})



