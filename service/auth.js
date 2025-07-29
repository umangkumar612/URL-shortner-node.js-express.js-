const jwt = require("jsonwebtoken");
const SECRET = "Um@ng1011206"; // make sure this is defined

function setUser(user) {
    // ✅ user ek object hona chahiye: e.g. {_id: '...', email: '...'}
    return jwt.sign(
        {
             _id: user._id,
              email: user.email ,
              role:user.role,
            }, SECRET);
}


function getUser(token) {
    try {
        return jwt.verify(token, SECRET);
    } catch (err) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
};
