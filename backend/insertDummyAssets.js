import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Asset from './models/Asset.js';

dotenv.config(); // Load MONGO_URI from .env

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

const insertAssets = async () => {
  try {
    const dummyAssets = [
      {
        name: 'Rifle',
        type: 'Weapon',
        quantity: 6000,
        base_id: '686046f8bbdbbd0b744f7f3d', // 🔁 replace with real base_id
      },
      {
        name: 'Tank',
        type: 'Vehicle',
        quantity: 8000,
        base_id: '686046f8bbdbbd0b744f7f3d',
      },
      {
        name: 'Helmet',
        type: 'Equipment',
        quantity: 10000,
        base_id: '686046f8bbdbbd0b744f7f3d',
      },
    ];

    await Asset.insertMany(dummyAssets);
    console.log('✅ Dummy assets inserted');
    process.exit();
  } catch (err) {
    console.error('❌ Error inserting assets:', err.message);
    process.exit(1);
  }
};

await connectDB();
await insertAssets();