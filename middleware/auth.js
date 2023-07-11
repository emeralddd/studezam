const jwt = require('jsonwebtoken');
require('dotenv').config();
const users = require('../models/auth/users');
const { WRONG_ACCOUNT, ERROR_500 } = require('../VariableName');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const tokenReceived = (authHeader ? authHeader.split(' ')[1] : authHeader);

    if (!tokenReceived) {
        return res.status(401).json({
            success: false,
            message: 'Chưa đăng nhập!'
        });
    }

    try {
        const tokenDecoded = jwt.verify(tokenReceived, process.env.SECRET_TOKEN);
        req.executor = {
            _id: tokenDecoded._id,
            username: tokenDecoded.username,
        };
        next();
    } catch (err) {
        return res.status(403).json({
            success: false,
            message: "Phiên đăng nhập sai!"
        });
    }
}

const verifyUser = async (req, res, next) => {
    try {
        const foundUser = await users.findById(req.executor._id);

        if (!foundUser) {
            return res.status(400).json({
                success: false,
                message: WRONG_ACCOUNT
            });
        }

        req.executor = foundUser;

        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: ERROR_500
        });
    }
}

module.exports = verifyToken
module.exports = verifyUser