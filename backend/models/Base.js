import mongoose from 'mongoose';

const baseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String
});

const Base = mongoose.model('Base', baseSchema);
export default Base;
