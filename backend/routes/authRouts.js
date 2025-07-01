import express from 'express';
import User from '../models/Users.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, role, base_id } = req.body;

  const user = new User({ username, password, role, base_id });
  try {
    await user.save();
    const token = user.generateAuthToken();
    res.status(201).json({ token });  
  } catch (err) {
    res.status(400).json({ message: err.message });  
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user)
        {
            console.log("user not found")

        return res.status(400).json({ message: 'Invalid credentials' });
} 
    const isMatch = await user.comparePassword(password); 
    if (!isMatch){
 console.log("password mismatch")
   return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = user.generateAuthToken(); 
    res.status(200).json({ token,
          user: {
    username: user.username,
    role: user.role,
    base_id: user.base_id,
  },
     });
  } catch (err) {
    res.status(500).json({ message: err.message });  
  }
});

export default router;
