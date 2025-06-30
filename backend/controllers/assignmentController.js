import Assignment from '../models/Assignment.js';

// Create a new assignment
export const createAssignment = async (req, res) => {
  const { asset_id, personnel_id, quantity, date } = req.body;
  const base_id=req.user.base_id;

  // Simple validation
  if (!asset_id || !personnel_id || !quantity || !date) {
    return res.status(400).json({ message: 'All fields (asset_id, personnel_id, quantity, date) are required.' });
  }

  try {
    const assignment = new Assignment({
      asset_id,
      personnel_id,
      quantity,
      date,
      base_id,
    });
    await assignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Get all assignments
export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().populate('asset_id', 'name type');
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
