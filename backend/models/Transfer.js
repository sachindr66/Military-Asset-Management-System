import mongoose from 'mongoose';

const transferSchema = new mongoose.Schema({
  asset_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
  from_base_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Base', required: true },
  to_base_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Base', required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, required: true },
});

export default mongoose.model('Transfer', transferSchema);
