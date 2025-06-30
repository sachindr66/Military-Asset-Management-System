import express from 'express';
import User from '../models/Users.js';

const router = express.Router();

// Register a new user (Admin)
router.post('/register', async (req, res) => {
  const { username, password, role, base_id } = req.body;

  const user = new User({ username, password, role, base_id });
  try {
    await user.save();
    const token = user.generateAuthToken();
    res.status(201).json({ token });  // Return token after successful registration
  } catch (err) {
    res.status(400).json({ message: err.message });  // Return error message if registration fails
  }
});

// Login user and generate token
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user)
        {
            console.log("user not found")

        return res.status(400).json({ message: 'Invalid credentials' });
} 
    const isMatch = await user.comparePassword(password);  // Compare the password
    if (!isMatch){
 console.log("password mismatch")
   return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = user.generateAuthToken();  // Generate JWT token
    res.status(200).json({ token,
          user: {
    username: user.username,
    role: user.role,
    base_id: user.base_id, // ✅ Send base_id to frontend
  },
     });  // Return token on successful login
  } catch (err) {
    res.status(500).json({ message: err.message });  // Return server error message if any
  }
});

export default router;
