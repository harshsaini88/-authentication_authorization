// Import the Express framework
const express = require('express');

// Create a router instance to handle routes
const router = express.Router();

// Import validation function from the 'utils' directory
const { validateSignup } = require('../utils/validation');

// Import the 'createAdmin' controller function from the 'controllers' directory
const { createAdmin } = require('../controllers/adminController');

// Import the 'multer' library for handling file uploads
const multer = require('multer');

// Import the 'path' module for file path manipulation
const path = require('path');

// Configure 'multer' for storing uploaded files
const storage = multer.diskStorage({
  destination: 'uploads/', // Specify the destination folder for uploaded files
  filename: (req, file, cb) => {
    // Use the original name of the file with a timestamp to avoid overwriting
    const ext = path.extname(file.originalname);
    const fileName = file.originalname.replace(ext, '') + '-' + Date.now() + ext;
    cb(null, fileName);
  }
});

// Initialize 'multer' with the specified storage configuration
const upload = multer({ storage: storage });

// Define a route to handle the creation of an admin
router.post('/create', upload.single('profilePhoto'), validateSignup, createAdmin);

// Export the router for use in other files
module.exports = router;
