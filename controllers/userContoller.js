const User=require("../models/userModel")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const JWT=require('jsonwebtoken');
require('dotenv').config();

//Get request
exports.getSignUp=(req,res)=>{
    res.render("user/signup",{message:req.flash("msg")});
}

// Post request for user register...
exports.signUpUser=async(req,res)=>{
    const {username,email,password}=req.body;
    //check no field is empty
    if(!username || !email || !password){
        req.flash('msg',`Please fill the credentials carefully...`);
        return res.status(404).redirect('/user/signup');
    }
    //check if user is already register into the system
    const existingUser=await User.findOne({email})
    if(existingUser){
        req.flash('msg',`This ${existingUser.email} is already present`);
        return res.status(404).redirect('/user/signup');
    }
    try{
        //hashed the password before inserting into the db
        const hashPassword=await bcrypt.hash(password,saltRounds);
        const respone=await User.create({
            username:username,
            email:email,
            password:hashPassword
        })
        req.flash('msg',`Registered successfully, ${username}`);
        res.status(200).redirect('/user/login');

    }catch(err){
        req.flash('msg',`Something went wrong while registering your data, please try again`);
        res.status(404).redirect('/user/signup');
    }
}

// GET request
exports.getLogin=(req,res)=>{
    res.render("user/login",{message:req.flash('msg')});
}

// POST request
exports.logInUser=async(req,res)=>{
    const {email,password}=req.body;
    //check if, is there any field is empty'
    if(!email || !password){
        req.flash('msg',"Please fill credentials carefully!")
        return res.status(404).redirect('/user/login')
    }
    let user=await User.findOne({email});

    if(!user){
        req.flash('msg',"Yor're not registered, please register")
        return res.status(404).redirect('/user/signup')
        
    }
    else{
        
        // for passing the data into the token
        const payload={
            username:user.username,
            email:user.email,
        }
        //user is present, but check for the password...that he/she will enter

        if(await bcrypt.compare(password,user.password)){
            //password is correct...so creating a web token(JWT)
            const token=JWT.sign(payload,process.env.SECRET,{
                expiresIn:"2h"
            })
            user=user.toObject();
            user.token=token;
            user.password=undefined;

            const options={
                expiresIn:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,//clinet side cannot access
            }
            req.flash('msg',"Loggedin successfully")
            return res.cookie("token", token, options).status(200).redirect('/note/get');


        }
        else{
            //password is not correct...
            req.flash('msg',"Password is incorrect")
            return res.status(401).redirect('/user/login')
        }
    }

}
exports.aboutUser=async(req,res)=>{
    const token = req.cookies.token; // Retrieve token from cookies
    const decode = JWT.verify(token, process.env.SECRET);  
    res.render('user/about.ejs',{ decode});
}
