import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Asset from './models/Asset.js';

dotenv.config(); 

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
        quantity: 10,
        base_id: '6862c988dc31528dc75cdf3d', // 🔁 replace with real base_id
      },
      {
        name: 'Tank',
        type: 'Vehicle',
        quantity: 10,
        base_id: '6862c988dc31528dc75cdf3d',
      },
      {
        name: 'Helmet',
        type: 'Equipment',
        quantity: 10,
        base_id: '6862c988dc31528dc75cdf3d',
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