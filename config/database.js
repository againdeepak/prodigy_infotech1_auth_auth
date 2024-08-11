const mongoose=require('mongoose');
require('dotenv').config();
const dbConn=async ()=>{
    await mongoose.connect(process.env.MONGO_ATLAS_URL)
    .then(()=>{console.log("Connected to database")})
    .catch((err)=>{console.log("Error occured while connecting to Database",err)})
}
module.exports=dbConn;