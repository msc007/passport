const express = require('express');
const router = express.Router();

//tournament
router.get('/:postID', (req, res) => {

    if(req.isAuthenticated()){
        //authenticated user
        res.render('tournament', {
            name: req.user.name,
            sessionID: req.sessionID,
            postID: req.param.postID
        });
    } else {
        //not authenticated user
        res.render('tournament', {
            name: undefined,
            sessionID: undefined,
            postID: req.param.postID
        });
    }
});

module.exports = router;