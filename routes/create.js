const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


//User Only Create Page
router.get('/new', ensureAuthenticated, (req, res) =>{
    res.render('new', {
        name: req.user.name,
        sessionID: req.sessionID
    });
});

module.exports = router;