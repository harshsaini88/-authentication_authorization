// Import required modules
const authMiddleware = require('../middlewares/authMiddleware'); // Import authentication middleware
const { validateSignup } = require('../utils/validation'); // Import validation utility
const User = require("../models/userModel"); // Import User model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import JSON Web Token for authentication
const config = require('../config/config'); // Import configuration
const path = require('path'); // Import path module for file handling
const fs = require('fs').promises; // Import promises-based filesystem module

// Controller function to get all users
const getAllUsers = async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.role === 'Admin') {
      // Admin can see all users
      const users = await User.find();
      return res.json(users);
    } else {
      // Regular user can see only their own data
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Wrap the single user in an array
      return res.json([user]);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to handle user signup
const signup = async (req, res) => {
    try {
        const { email, phone, name, password, profileImage } = req.body;
    
        // Check if the email or phone is already registered
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists with the provided email or phone' });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create user
        const user = new User({
          email,
          phone,
          name,
          password: hashedPassword,
          profileImage : req.file.filename,
        });
    
        await user.save();
    
        return res.redirect("/login");
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
};

// Controller function to handle user login
const login = async (req, res) => {
    try {
        const { emailOrPhone, password } = req.body;
        
        // Check if the user exists
        const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // Generate JWT
        const token = jwt.sign({ user: { id: user._id, role: user.role } }, config.secret, { expiresIn: '1h' });
        
        // Set the token in a cookie
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // maxAge is in milliseconds (1 hour in this case)
        return res.redirect('/home');

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller function to modify user details
const modifyUserDetails = async (req, res) => {
  try {
    console.log(req.body);
    const { name, profileImage } = req.body;
    const userIdFromRoute = req.params.userId;
    const userIdFromRequest = req.user.id;

    if (userIdFromRoute !== userIdFromRequest && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Unauthorized: You can only modify your own data or you must be an admin' });
    }

    let updatedFields = { name };

    // Handle the file as needed; for example, save it to a specific location or store it in the database
    if (req.file) {
      // Delete existing file if it exists
      const existingUser = await User.findById(userIdFromRoute);
      if (existingUser && existingUser.profileImage) {
        const filePath = path.join('uploads/', existingUser.profileImage);
        await fs.unlink(filePath);
      }

      updatedFields.profileImage = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userIdFromRoute,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.redirect("/login");
    

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Controller function to delete a user
const deleteUser = async (req, res) => {
    try {
        const { id: userId, role } = req.user;
        const targetUserId = req.params.userId;
    
        // Check if the requester is an admin or the owner of the account
        if (role === 'Admin' || userId === targetUserId) {
          // Remove user from the database
          const deletedUser = await User.findByIdAndDelete(targetUserId);
    
          if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
          }
    
          return res.json({ message: 'User deleted successfully' });
        } else {
          return res.status(403).json({ message: 'Unauthorized: You can only delete your own data' });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
};

// Export all controller functions for use in other files
module.exports = { getAllUsers, signup, login, modifyUserDetails, deleteUser };
