const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureNotAuthenticated } = require('../config/auth');


/*Welcome Page
router.get('/', ensureNotAuthenticated, (req, res) =>{
    res.render('welcome');
});*/

//Home page
router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        //authenticated user
        res.render('home', {
            name: req.user.name,
            sessionID: req.sessionID
        });
    } else {
        //not authenticated user
        res.render('home', {
            name: undefined,
            sessionID: undefined
        });
    }
});

//Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {
        name: req.user.name,
        sessionID: req.sessionID
    });
});

module.exports = router;