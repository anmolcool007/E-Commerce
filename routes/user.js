const express = require('express');
const router = express.Router();

const { signup } = require("../controllers/user");
const { validator, result } = require("../validator/index");

router.post("/signup", validator, result, signup);

module.exports = router;