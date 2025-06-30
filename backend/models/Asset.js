import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity cannot be negative'],
    },
    base_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Base',
    },
    status: {
      type: String,
      default: 'Available',
      enum: ['Available', 'Assigned', 'In Transit', 'Damaged'],
    },
    purchase_date: {
      type: Date,
      default: Date.now,
    },
    last_maintenance_date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Asset', assetSchema);
