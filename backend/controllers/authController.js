import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken'; 
import User from '../models/User.js'; 

export const login = async (req, res) => {
  const { username, password } = req.body;  

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { _id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } 
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
