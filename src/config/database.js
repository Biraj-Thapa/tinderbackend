const mongoose=require("mongoose")

const connectDb=async()=>{
    await mongoose.connect("mongodb://localhost:27017/tinderBackend")

}

module.exports= connectDb;

