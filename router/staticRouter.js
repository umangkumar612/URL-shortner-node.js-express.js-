const express = require('express');
const router = express.Router();
const URL = require('../models/url');
const { checkForAuthentication, restrictTo } = require('../middlewares/auth');

router.get('/home', checkForAuthentication, restrictTo(['NORMAL']), async (req, res) => {
    const allurl = await URL.find({ createdBy: req.user._id });
    return res.render('home', {
        urls: allurl,
    });
});



router.get('/signup', (req, res) => {
    return res.render('signup');
});
router.get('/login', (req, res) => {
    return res.render('login');
});

module.exports = router;
