const express = require('express');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;



const router = express.Router();

router.get("/profile", async (req, res) => {
    res.render("profile")
});

router.get("/newsfeed", async (req, res) => {
    res.render("newsfeed", { user: req.user });
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/newsfeed",
    failureRedirect: "/"
})
);

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;