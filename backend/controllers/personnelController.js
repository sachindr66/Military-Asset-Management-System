import Personnel from '../models/Personnel.js';

export const getPersonnel = async (req, res) => {
  try {
    const personnel = await Personnel.find();
    res.json(personnel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
