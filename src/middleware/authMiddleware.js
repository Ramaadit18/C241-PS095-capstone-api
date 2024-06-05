const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Verify if the token is included in Header
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ status: 'fail', message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).json({ status: 'fail', message: 'Failed to authenticate token' });
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
