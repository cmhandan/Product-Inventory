const jwt = require('jsonwebtoken');
const generateJwt = (payload) => {
    console.log(payload);
    return jwt.sign(payload, process.env.SECRET, {
        expiresIn: "1Hr",
        issuer:"Product Inventory"
    })
}

const verifyJwt = (token) => {
    const payload = jwt.verify(token, process.env.SECRET);
    if (!payload) {
        return false;
    }
    return true;
}

module.exports = {
    generateJwt,
    verifyJwt
}