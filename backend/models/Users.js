import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['Admin', 'Base Commander', 'Logistics Officer'] },
  base_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Base' }, // Assuming 'Base' is another model
});

// Hash password before saving it to the database
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to compare the provided password with the stored hashed password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Method to generate JWT token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, username: this.username, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return token;
};

export default mongoose.model('User', userSchema);  // Export model correctly
