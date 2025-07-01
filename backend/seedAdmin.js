import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/Users.js';
import Base from './models/Base.js';

dotenv.config();

const createUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const base = new Base({ name: 'Bravo Base', location: 'Eastern Zone' });
    await base.save();
    console.log('Base created:', base);

    // Create Admin
    const adminUser = new User({
      username: 'adminuser',
      password: 'admin123',
      role: 'Admin',
      base_id: base._id,
    });

    // Create Base Commander
    const commanderUser = new User({
      username: 'commander',
      password: 'commander123',
      role: 'Base Commander',
      base_id: base._id,
    });

    // Create Logistics Officer
    const logisticsUser = new User({
      username: 'logistics',
      password: 'logistics123',
      role: 'Logistics Officer',
      base_id: base._id,
    });

    await adminUser.save();
    await commanderUser.save();
    await logisticsUser.save();

    console.log('Admin user created:', adminUser.username);
    console.log('Base Commander created:', commanderUser.username);
    console.log('Logistics Officer created:', logisticsUser.username);

    process.exit();
  } catch (err) {
    console.error('Error seeding users:', err.message);
    process.exit(1);
  }
};

createUsers();
