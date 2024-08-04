const Note=require("../models/noteModel");
const User=require("../models/userModel");
require('dotenv').config();
const jwt=require('jsonwebtoken')
//Get the Note page

exports.getcreateNote=(req,res)=>{
    res.render('notes/createnote.ejs')
}

//POST for creating Note

//do validation of this...
exports.createNote=async(req,res)=>{
    const {title,description}=req.body;
    const note=new Note({
        title,description
    })
    //saved the new note into the database
    const token = req.cookies.token; // Retrieve token from cookies
    const decode = jwt.verify(token, process.env.SECRET);
    const Userid=await User.findOne({email:decode.email});
   
    const savedNote=await note.save();
    console.log(savedNote);
    //find the post by ID, and the new comment to its comments array...
    const updatedUser=await User.findByIdAndUpdate(Userid._id,{$push:{notes:savedNote._id}},{new:true}).populate("notes");//populate the comments array with comment documents
    res.status(200).redirect('/note/get');
}
exports.getNote=async (req,res)=>{
    const token = req.cookies.token; // Retrieve token from cookies
    const decode = jwt.verify(token, process.env.SECRET);
    const Userid=await User.findOne({email:decode.email}).populate("notes");
    res.render('notes/allnotes.ejs',{Userid,message:req.flash('msg')});
   
}