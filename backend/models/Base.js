import mongoose from 'mongoose';

const transferSchema = new mongoose.Schema({
  asset_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset' },
  from_base_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Base' },
  to_base_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Base' },
  quantity: Number,
  date: Date,
});

// ✅ Avoid OverwriteModelError
const Transfer = mongoose.models.Transfer || mongoose.model('Transfer', transferSchema);
export default Transfer;
