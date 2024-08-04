//auth, isStu, isAdmin
const jwt = require('jsonwebtoken');
require('dotenv').config();



exports.auth = (req, res, next) => {
    try {
        //extract JWT token
        //other way to fetch token
        const token = req.cookies.token; // Retrieve token from cookies
        if (!token) {
            req.flash("error","Please login for your notes")
            res.status(401).redirect('/user/login');
            // ({
            //     success: false,
            //     message: "Authentication token Missing",
            // })
        }

        //verify the token
        try {
            const decode = jwt.verify(token, process.env.SECRET);
            console.log(decode.username);
            req.user = decode;

        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "token is invalid",
            })
        }
        next();

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "something went wrong while verifying",
        })
    }
}


//before creating notes, i will check for authentication
exports.authNote = (req, res, next) => {
    try {
        //extract JWT token
        //other way to fetch token
        const token = req.cookies.token; // Retrieve token from cookies
        if (!token) {
            req.flash("msg","First login for creating note");
            return res.status(401).redirect('/user/login');
        }

        //verify the token
        try {
            const decode = jwt.verify(token, process.env.SECRET);
            console.log(decode.username);
            req.user = decode;

        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "token is invalid",
            })
        }
        next();

    } catch (err) {
        req.flash('msg',"something went wrong while verifying, try again");
        return res.status(401).redirect('/user/login')
    }
}


//before creating notes, i will check for authentication
exports.aboutUserauth = (req, res, next) => {
    try {
        
        const token = req.cookies.token; // Retrieve token from cookies
        if (!token) {
            req.flash("msg","Not allowed for about, please login");
            return res.status(401).redirect('/user/login');
        }

        //verify the token
        try {
            const decode = jwt.verify(token, process.env.SECRET);
            console.log(decode.username);
            req.user = decode;

        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "token is invalid",
            })
        }
        next();

    } catch (err) {
        req.flash('msg',"something went wrong while verifying, try again");
        return res.status(401).redirect('/user/login')
    }
}