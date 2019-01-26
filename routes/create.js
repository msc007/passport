const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


//User Only Create Page
router.get('/new', (req, res) =>{
    res.render('new');
});

module.exports = router;