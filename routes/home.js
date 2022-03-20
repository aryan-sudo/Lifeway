const express = require('express');
const router = express.Router();

router.get("/profile", async (req, res) => {
    res.render("profile")
});

router.get("/newsfeed", async (req, res) => {
    res.render("newsfeed")
});

module.exports = router;