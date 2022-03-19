const express = require("express");
const app = express();
const engine = require("ejs-mate");
const PORT = 8080;
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const homeRoutes = require('./routes/home');
const groupRoutes = require('./routes/group');
const userRoutes = require('./routes/users');
mongoose.connect('mongodb://localhost:27017/myapp').
    catch(error => handleError(error));

const path = require('path');
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', homeRoutes);
app.use('/group', groupRoutes);
app.use('/user', userRoutes);


app.get('/', (req, res) => {
    res.render('home')
});


app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});