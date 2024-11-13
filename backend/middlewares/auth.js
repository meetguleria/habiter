const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    let token = req.header('Authorization');

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    token = token.replace('Bearer ', '');

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        res.status(400).send('Invalid token.');
        console.error(err);
    }
}

module.exports = auth;