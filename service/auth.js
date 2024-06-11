// const sessionIdToUserMap = new Map(); // used to create stateful

// function setUser(id, user) {
//     sessionIdToUserMap.set(id, user)
// }

// function getUser(id) {
//     return sessionIdToUserMap.get(id)
// }

// module.exports = {
//     setUser,
//     getUser
// }



const jwt = require("jsonwebtoken") // used to create stateless
const secret = "MOON123"

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email
    }, secret
    )
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret)
    } catch (error) {
        return null;
    }
}


module.exports = {
    setUser,
    getUser
}