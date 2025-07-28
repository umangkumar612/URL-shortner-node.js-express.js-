const User = require('../models/user');
const {v4:uuidv4} = require('uuid');
const {setUser} = require('../service/auth');
async function HandleUserSignup(req, res) {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        // 👇 Show warning on signup page
        return res.render("signup", { warning: "Email already exists. Try logging in." });
    }

    await User.create({ name, email, password });

    return res.redirect('/');
}

async function HandleUserLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        // Email not registered
        return res.render("login", { warning: "User not registered. Please sign up." });
    }

    if (user.password !== password) {
        // Wrong password
        return res.render("login", { warning: "Incorrect email or password. Try again." });
    }
  const sessionId = uuidv4();
  setUser(sessionId , user);
  res.cookie('uid', sessionId);
    // ✅ Login successful
    return res.redirect('/');
}

module.exports = {
    HandleUserSignup,
    HandleUserLogin,
};
