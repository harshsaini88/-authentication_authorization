// Import required modules
const User = require('../models/userModel'); // Import the User model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

// Controller function to create an admin user
const createAdmin = async (req, res) => {
  try {
    // Destructure required fields from the request body
    const { email, phone, name, password, profileImage } = req.body;

    // Check if an admin already exists
    const adminExists = await User.findOne({ role: 'Admin' });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin user instance
    const admin = new User({
      email,
      phone,
      name,
      password: hashedPassword,
      profileImage: req.file.filename, // Set the profile image from the uploaded file
      role: 'Admin'
    });

    // Save the admin user to the database
    await admin.save();

    // Return success message
    return res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    // Handle errors and log them
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Export the createAdmin function for use in other files
module.exports = { createAdmin };
