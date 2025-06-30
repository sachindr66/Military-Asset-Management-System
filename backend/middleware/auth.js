import jwt from 'jsonwebtoken';
import User from '../models/Users.js';

// Authentication Middleware
const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');  // Get token from Authorization header
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token

    // Check if user exists
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }

    req.user = user;  // Attach user to the request object
    next();  // Proceed to the next middleware or route
  } catch (err) {
    res.status(401).json({ message: 'Please authenticate.' });  // Unauthorized if no token or invalid token
  }
};

// Authorization Middleware
const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {  // Check if user role is in the allowed roles
      return res.status(403).json({ message: 'You do not have permission to perform this action.' });
    }
    next();  // Proceed if the user has the correct role
  };
};

// Export the functions
export { authenticate, authorize };




