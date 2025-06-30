import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/Users.js';
import Base from './models/Base.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Create a base if not already present
    const base = new Base({ name: 'Headquarters', location: 'Central Command' });
    await base.save();
    console.log('✅ Base created:', base);

    // ❌ Don't hash manually — your User model does it
    const adminUser = new User({
      username: 'adminuser',
      password: 'admin123', // plain text; will be hashed by the model
      role: 'Admin',
      base_id: base._id,
    });

    await adminUser.save();
    console.log('✅ Admin user created:', adminUser);

    process.exit();
  } catch (err) {
    console.error('❌ Error seeding admin:', err.message);
    process.exit(1);
  }
};

createAdmin();
