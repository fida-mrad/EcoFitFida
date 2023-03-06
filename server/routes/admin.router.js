var express = require("express");
var router = express.Router();
const controller = require("../controllers/admin.controller");
const {authAdmin} = require('../middleware/auth')

router.post('/add', authAdmin,controller.addAdmin)
router.get('/refresh_token', controller.refreshToken)
router.post('/login', controller.login)
router.get('/logout', controller.logout)




module.exports = router;
