const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    notes:[{
        type: mongoose.Types.ObjectId,
        ref: 'Note',
    }],
})
const User=new mongoose.model("User",userSchema);
module.exports=User;