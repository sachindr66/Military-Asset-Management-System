import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken'; 
import User from '../models/User.js';  // User model

// Login route controller
export const login = async (req, res) => {
  const { username, password } = req.body;  // Get the username and password from request body

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Create a JWT token
    const token = jwt.sign(
      { _id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,  // The secret key for JWT generation
      { expiresIn: '1h' }  // Token expiration time (1 hour)
    );

    // Send the token in the response
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
