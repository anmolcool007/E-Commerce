const express = require('express');
const router = express.Router();

const { signup, signin, signout, requireSignin } = require("../controllers/user");
const { validator, result } = require("../validator/index");

router.post("/signup", validator, result, signup);
router.post("/signin", signin);
router.get("/signout", signout);


//use the code below for opening routes only for signed in user
/*
router.get("/hello", requireSignin, (req, res)=>{
    res.send("Dashboard");
});
*/

module.exports = router;