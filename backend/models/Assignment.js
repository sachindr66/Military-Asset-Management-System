import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  asset_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asset',
    required: true,
  },
  personnel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"personnel",
    required: true,

  },
  quantity: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  base_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"base",
    required:true,
  }
});

export default mongoose.model('Assignment', assignmentSchema);
