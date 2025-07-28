const express = require('express');
const router = express.Router();
const { HandleUserSignup , HandleUserLogin } = require('../controllers/user');

// ✅ Renders the signup form at GET /user/signup
router.get('/signup', (req, res) => {
    res.render('signup'); // make sure views/signup.ejs exists
});

// ✅ Handles the form submission
router.post('/signup', HandleUserSignup);
router.post('/login', HandleUserLogin);

module.exports = router;
