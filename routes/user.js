const express = require('express');
const router = express.Router();

const { signup, signin, signout } = require("../controllers/user");
const { validator, result } = require("../validator/index");

router.post("/signup", validator, result, signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;