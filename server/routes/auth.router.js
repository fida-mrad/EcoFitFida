var express = require("express");
const { verify2FA } = require("../controllers/auth.controller");
var router = express.Router();
const passport = require("passport");
const controller = require("../controllers/auth.controller");
const {authClient} = require('../middleware/auth')
const CLIENT_URL = "http://localhost:3000/";

router.post('/register', controller.register)
router.get('/refresh_token', authClient,controller.refreshToken)
router.post('/login',controller.login)
router.get('/logout', controller.logout)
router.get('/activate/:token',  controller.confirmEmail)
router.get('/get',  authClient,controller.getClient)
router.get('/enable2fa',authClient,controller.enable2FA)
router.post('/verify2fa',authClient,controller.verify2FA)

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);


module.exports = router;
