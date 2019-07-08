const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = function (req, res, next) {
    const token = req.headers.authorization.split(' ');

    if (!token[1]) {
        return res.json({
            success: false,
            error: 'Token doesn\'t exist'
        })
    }

    try {
        const decoded = jwt.verify(token[1], config.secretKey);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({msg: 'Token is not valid'});
    }
};