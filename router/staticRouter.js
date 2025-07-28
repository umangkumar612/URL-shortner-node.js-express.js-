const express = require('express');
const router = express.Router();
const URL = require('../models/url');

router.get('/', async (req, res) => {
    if(!req.user) return res.redirect('login'); 
    const allurl = await URL.find({createdBy : req.user._id});
    return res.render('home', {
        urls: allurl, // ✅ match this name with what EJS expects
    });
});

router.get('/signup', (req, res) => {
    return res.render('signup');
});

module.exports = router;
