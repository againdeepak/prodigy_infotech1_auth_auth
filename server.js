const express=require("express")
const app=express();
require('dotenv').config();
const dbConn=require('./config/database')
const path=require('path')
const noteRouter=require('./routers/noteRouter');
const userRouter=require('./routers/userRouter');
const cookieParser = require('cookie-parser');
const bodyParser=require('body-parser')
const session=require("express-session")
const flash=require('connect-flash')
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Set up session middleware
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}));
  
  // Set up flash middleware
app.use(flash());


// Routers
app.use('/note/',noteRouter);
app.use('/user/',userRouter);
app.get('/',(req,res)=>{
    res.render("pages/index",{ message:req.flash('msg')})
})

app.post('/logout',(req,res)=>{
    res.cookie('token','',{maxAge:1});
    req.flash('msg','Logout successfully')
    res.redirect('/');
})




//Database connection
dbConn();
app.listen("3009",()=>{
    console.log("app is listening to port number:3009");
})
