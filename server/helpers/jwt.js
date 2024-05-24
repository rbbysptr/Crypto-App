const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

function signToken(data) {
    return jwt.sign(data, secret);
}

function verifyToken(token) {
    return jwt.verify(token, secret);
}
module.exports = { signToken, verifyToken };