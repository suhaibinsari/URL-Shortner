const { getUser } = require("../service/auth")

async function restrictToLoggedInUserOnly(req, res, next) {
    // const userUid = req.cookies?.uid // for cookies
    const userUid = req.headers['authorization']; // for headers authorization
    if (!userUid) return res.redirect('/login')
    const token = userUid.split("Bearer ")[1] // Bearer [12312kjkamxkns934]
    const user = getUser(token) // now replace userUid with token
    if (!user) return res.redirect('/login')
    req.user = user;
    next()
}

async function checkAuth(req, res, next) {
    // const userUid = req.cookies?.uid // for cookies
    const userUid = req.headers['authorization']; // for headers authorization;

    const token = userUid.split("Bearer ")[1] // Bearer [12312kjkamxkns934]
    const user = getUser(token) // now replace userUid with token
    req.user = user;

    next()
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth
}