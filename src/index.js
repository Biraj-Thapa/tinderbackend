const express=require("express");
const db=require("./config/database")
const app=express();
const User=require("./models/user")

const port=4623
app.use(express.json())
app.post("/signup",async (req,res)=>{
    //creating new instance of user model
    const user=new User(req.body)
    try{
        await user.save()
        res.status(201).send("user added successful")

    }
    catch(err){
        res.status(400).send(err.message)
    }

})

db().then(()=>{
    console.log("Db connect vayo")
    app.listen(port,()=>{
        console.log(`listening on port ${port}`)
    })

}).catch((err)=>{
    console.log("Db connect vayena")
})



