import Base from '../models/Base.js';

export const getBases = async (req, res) => {
  try {
    const bases = await Base.find();
    res.status(200).json(bases);
  } catch (error) {
    console.error('Error fetching bases:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
