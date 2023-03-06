var express = require("express");
var router = express.Router();
const controller = require("../controllers/agent.controller");
const {authAdmin,authAgent} = require('../middleware/auth')

router.post('/register', controller.register)
router.get('/refresh_token', authAgent,controller.refreshToken)
router.post('/login', controller.login)
router.get('/logout', controller.logout)
router.post('/approve', authAdmin,controller.approve)
router.get('/activate/:token',  controller.confirmEmail)




module.exports = router;
