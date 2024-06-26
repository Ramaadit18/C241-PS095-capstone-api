const { firestore } = require('../firebase');
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Retrieve the user document from Firestore
    const userSnapshot = await firestore.collection('users').where('email', '==', email).get();

    if (userSnapshot.empty) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }

    const userData = userSnapshot.docs[0].data();

    // Check if the provided password matches
    if (password !== userData.password) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect password',
      });
    }

    // const { accessToken, refreshToken } = generateTokens(userData);

    // Generate JWT token
    const token = jwt.sign({ id: userData.id, email: userData.email, username:userData.username }, JWT_SECRET_KEY, { expiresIn: '1h' });

    return res.status(200).json({
      status: 'success',
      message: 'User logged in successfully',
      token,
      user: {
        id: userData.id,
        username: userData.username,
        email: userData.email,
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: error.message || 'Internal Server Error',
    });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'Unauthorized',
      });
    }
    
    // Invalidate the token by signing an empty payload
    const invalidatedToken = jwt.sign({}, JWT_SECRET_KEY, { expiresIn: '1s' });

    // Set the invalidated token in the response headers
    res.setHeader('X-Invalid-Token', invalidatedToken);

    return res.status(200).json({
      status: 'success',
      message: 'User logged out successfully',
    });
    
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: error.message || 'Internal Server Error',
    });
  }
};


module.exports = {
  login,
  logout,
};
