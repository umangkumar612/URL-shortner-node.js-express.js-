const { getUser } = require('../service/auth');

function checkForAuthentication(req, res, next) {
    const token = req.cookies?.token;
    if (!token) {
        return res.redirect('/login');
    }

    const user = getUser(token);
    if (!user) {
        return res.redirect('/login');
    }

    req.user = user;
    next();
}

function restrictTo(roles = []) {
    return function (req, res, next) {
        if (!req.user) {
            return res.redirect('/login');
        }

        if (!roles.includes(req.user.role)) {
            return res.render("home", { urls: [] }); // still shows home but empty
        }

        next();
    };
}

module.exports = {
    checkForAuthentication,
    restrictTo,
};
