const express=require('express');
const router=express.Router();
const{getcreateNote,createNote,getNote}=require("../controllers/noteController");
const {auth,authNote}=require('../middleware/auth')
router.get('/create/',getcreateNote)
    .post('/create/',authNote,createNote)
    .get('/get/',auth,getNote);

module.exports=router;




