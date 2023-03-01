var express = require("express");
var router = express.Router();
const controller = require("../controllers/auth.controller");
const {checkDuplicateUsernameOrEmail,ValidateClient} = require('../middleware/signupValidator');



router.post("/signup",[checkDuplicateUsernameOrEmail] ,controller.signup);

router.post("/login", controller.login);
module.exports = router;
