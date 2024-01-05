// Import the Mongoose library
const mongoose = require('mongoose');

// Extract the 'Schema' class from Mongoose
const Schema = mongoose.Schema;

// Define the user schema using the 'Schema' class
const userSchema = new Schema({
  // Email field with uniqueness constraint and required validation
  email: { type: String, unique: true, required: true },

  // Phone field with uniqueness constraint
  phone: { type: String, unique: true },

  // Name field with required validation
  name: { type: String, required: true },

  // Password field with required validation
  password: { type: String, required: true },

  // Profile image field as a string
  profileImage: { type: String },

  // Role field with predefined values 'Admin' or 'User', default is 'User'
  role: { type: String, enum: ['Admin', 'User'], default: 'User' }
});

// Create and export the 'User' model based on the defined schema
module.exports = mongoose.model('User', userSchema);
