const express = require('express');
const session = require("express-session");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;



const router = express.Router();

router.get("/profile", async (req, res) => {
    res.render("profile")
});

router.get("/newsfeed", async (req, res) => {
    res.render("newsfeed", { user: req.user });
});

router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.epassword, 10, (err, hashedPassword) => {
        if (err) {

        }

        const add = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword
        });
        add.save();
    });


    res.redirect('/');
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