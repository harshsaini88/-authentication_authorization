// Import the Express framework
const express = require('express');

// Create a router instance to handle routes
const router = express.Router();

// Import user controller functions from the 'controllers' directory
const userController = require('../controllers/userController');

// Import authentication middleware from the 'middlewares' directory
const authMiddleware = require('../middlewares/authMiddleware');

// Import validation functions from the 'utils' directory
const { validateSignup, validateLogin } = require('../utils/validation');

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

// Route for user signup, including file upload and validation
router.post('/signup', upload.single('profilePhoto'), validateSignup, userController.signup);

// Route for user login, including validation
router.post('/login', validateLogin, userController.login);

// Route to get all users, protected by authentication middleware
router.get('/', authMiddleware, userController.getAllUsers);

// Apply authentication middleware to secure the following routes
router.use(authMiddleware);

// Route to modify user details with user ID, including file upload
router.put('/modify/:userId', upload.single('profileImage'), userController.modifyUserDetails);

// Route to delete user with user ID
router.delete('/delete/:userId', userController.deleteUser);

// Export the router for use in other files
module.exports = router;
