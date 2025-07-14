import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // hashed
  role: { type: String, default: 'buyer' }
});

const User = mongoose.model('User', userSchema);

export default User;
