var express = require("express");
const { verify2FA } = require("../controllers/auth.controller");
var router = express.Router();
const controller = require("../controllers/auth.controller");
const {authClient} = require('../middleware/auth')

router.post('/register', controller.register)
router.get('/refresh_token', authClient,controller.refreshToken)
router.post('/login',controller.login)
router.get('/logout', controller.logout)
router.get('/infor', authClient,  controller.getUser)
router.get('/activate/:token',  controller.confirmEmail)
router.get('/get',  authClient,controller.getClient)
router.get('/enable2fa',authClient,controller.enable2FA)
router.post('/verify2fa',authClient,controller.verify2FA)




module.exports = router;
