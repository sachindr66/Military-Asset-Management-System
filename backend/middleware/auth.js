import jwt from 'jsonwebtoken';
import User from '../models/Users.js';

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');  // Get token from Authorization header
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token

    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }

    req.user = user;  
    next(); 
  } catch (err) {
    res.status(401).json({ message: 'Please authenticate.' });  // Unauthorized if no token or invalid token
  }
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {  
      return res.status(403).json({ message: 'You do not have permission to perform this action.' });
    }
    next();  
  };
};

export { authenticate, authorize };




