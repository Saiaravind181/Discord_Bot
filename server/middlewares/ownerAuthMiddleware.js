const jwt = require('jsonwebtoken');

const ownerAuthMiddleware = (req, res, next) => {
    // Get the token from the request cookie
    const token = req.cookies.token;

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add the decoded data to the request object
        req.user = decoded.id;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = ownerAuthMiddleware;