import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  asset_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asset',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  base_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Purchase', purchaseSchema);
