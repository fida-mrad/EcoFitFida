var express = require("express");
var router = express.Router();
const controller = require("../controllers/agent.controller");
// const auth = require('../middleware/auth')

router.post('/register', controller.register)
router.get('/refresh_token', controller.refreshToken)
router.post('/login', controller.login)
router.get('/logout', controller.logout)
router.post('/approve', controller.approve)
// router.get('/infor', auth,  controller.getUser)
router.get('/activate/:token',  controller.confirmEmail)
// router.get('/get',  controller.getClient)




module.exports = router;
