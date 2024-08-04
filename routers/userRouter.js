const express=require('express');
const router=express.Router();
const{getSignUp,signUpUser,getLogin,logInUser,aboutUser}=require("../controllers/userContoller");
const {aboutUserauth}=require('../middleware/auth')
router.get('/signup/',getSignUp)
    .post('/signup/',signUpUser)
    .get('/login/',getLogin)
    .post('/login/',logInUser)
    .get('/about',aboutUserauth,aboutUser);
    
module.exports=router;
