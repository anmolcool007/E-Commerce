const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const {errorHandler} = require("../helpers/dbErrorHandler");

exports.signup = (req, res) => {
    console.log("req.body", req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    });
};


exports.signin = (req, res) =>{
    const {email, password} = req.body;
    User.findOne({email}, (err, user) =>{
        if(err || !user) {
            return res.status(400).json({
                error: "User does not exist. Sign Up first"
            });
        }

        // send user entered password to models/user.js
        // compare and validate auth
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and Password do not match"
            });
        }

        //token generation w.r.t to id and hashed password
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        // token='t' in cookie with expiry date
        res.cookie('t', token, {expire: new Date() + 9999});
        // if valid return token and login user
        const {_id, name, email, role} = user;
        return res.json({token, user: {_id, email, name, role}});

    });
};


exports.signout = (req, res) =>{
    res.clearCookie('t');
    res.json({message: "Successfully Signed Out"});
};

// logged in user control
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth"
});