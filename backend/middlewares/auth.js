const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        console.error('No authorization header provided');
        return res.status(401).send('Access denied. No token provided.');
    }

    // The Authorization header should start with 'Bearer '
    if (!authHeader.startsWith('Bearer ')) {
        console.error('Authorization header is not in the correct format');
        return res.status(400).send('Invalid authorization format. Token should be prefixed with "Bearer ".');
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];

    try {
        // Verify the token
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload; // Attach user payload to request for further use in routes
        next(); // Token is valid, proceed to the next middleware or route handler
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            console.error('Expired token:', err);
            return res.status(401).send('Token expired. Please log in again.');
        }
        console.error('Invalid token:', err);
        return res.status(401).send('Invalid token.'); // Respond with 401 status code for unauthorized access
    }
}

module.exports = auth;
