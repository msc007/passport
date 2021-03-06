const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const app = express();

//Passport config
require('./config/passposrt')(passport);

//DB config
const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('Failed to connect: ', err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Body parser: form data from req.body
app.use(express.urlencoded({extended: true}));

//Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

//Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//No Cache - solve back button problem
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});

//Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/create', require('./routes/create'));
app.use('/tournament', require('./routes/tournament'));

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server started on port ${port}`));