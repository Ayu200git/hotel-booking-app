const express = require("express");
const router = express.Router({mergeParams: true});
const User = require("../models/users.js");
const wrapasync = require("../utils/wrapasync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const usersController = require("../controllers/users.js");

router
.route("/signup")
.get( usersController.renderSignup)
.post(wrapasync(usersController.signup))


router
.route("/login")
.get(usersController.loginRender)
.post(saveRedirectUrl,
    passport.authenticate("local", {
         failureRedirect: "/login", 
         failureFlash: true,
    }), usersController.login
);

router.get("/logout", usersController.logout)

module.exports = router;
