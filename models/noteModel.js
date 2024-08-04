const mongoose=require('mongoose');
const noteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now(),
    }
});
const Note=new mongoose.model("Note",noteSchema);
module.exports=Note;