require('dotenv').config();
const express = require("express");
const app = express();
const engine = require("ejs-mate");
const PORT = 8080;
const session = require("express-session");
const passport = require("passport");
const bcrypt = require('bcryptjs');
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const homeRoutes = require('./routes/home');
const User = require('./models/userModel');
// const groupRoutes = require('./routes/group');
// const userRoutes = require('./routes/users');
mongoose.connect('mongodb://localhost:27017/myapp').
    catch(error => handleError(error));

const path = require('path');
// const { userInfo } = require("os");
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true }));

passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    // passwords match! log user in
                    return done(null, user)
                } else {
                    // passwords do not match!
                    return done(null, false, { message: "Incorrect password" })
                }
            });
            return done(null, user);
        });
    })
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});


app.use('/', homeRoutes);
// app.use('/group', groupRoutes);
// app.use('/user', userRoutes);


app.get('/', (req, res) => {
    res.render('home')
});



app.listen(process.env.PORT, () => {
    console.log(`Listening at port ${PORT}`);
});