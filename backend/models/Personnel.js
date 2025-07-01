import mongoose from 'mongoose';

const personnelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rank: { type: String, required: true },
  base_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Base' }, 
});

export default mongoose.model('Personnel', personnelSchema);
