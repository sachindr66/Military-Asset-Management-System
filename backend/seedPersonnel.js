import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Personnel from './models/Personnel.js'; 

dotenv.config(); 

const start = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  await Personnel.create([
    { name: 'John Doe', rank: 'Captain' },
    { name: 'Jane Smith', rank: 'Sergeant' },
    { name: 'Rahul Kumar', rank: 'Lieutenant' }
  ]);

  console.log('Dummy personnel inserted');
  process.exit();
};

start();
