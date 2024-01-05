// Import required modules
const jwt = require('jsonwebtoken'); // Import JSON Web Token for authentication
const config = require('../config/config'); // Import configuration

// Middleware function to handle user authentication
module.exports = (req, res, next) => {
  // Retrieve the token from cookies
  let token = req.cookies.token;

  // Check if a token is present
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, config.secret);

    // Set the decoded user information in the request object
    req.user = decoded.user;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // Handle authentication errors and log them
    console.error('Authentication Error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
