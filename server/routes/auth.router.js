var express = require("express");
var router = express.Router();
const controller = require("../controllers/auth.controller");
const {authClient} = require('../middleware/auth')

router.post('/register', controller.register)
router.get('/refresh_token', authClient,controller.refreshToken)
router.post('/login', controller.login)
router.get('/logout', controller.logout)
router.get('/infor', authClient,  controller.getUser)
router.get('/activate/:token',  controller.confirmEmail)
router.get('/get',  authClient,controller.getClient)




module.exports = router;
