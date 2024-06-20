const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token after 'Bearer'

    if (!token) {
        return res.status(401).json({ message: 'Authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, 'abcd'); // Use your secret key
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ message: 'Token is not valid' });
    }
};
