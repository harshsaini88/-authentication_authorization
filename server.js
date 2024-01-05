// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const config = require('./config/config');
const adminRoutes = require('./routes/adminRoutes')
const cookieParser = require('cookie-parser')
const path = require('path')

// Creating an Express application
const app = express();

// Adding middleware for parsing JSON requests
app.use(bodyParser.json());

// Adding middleware for parsing cookies
app.use(cookieParser());

// Setting the view engine to EJS
app.set('view engine', 'ejs');

// Serving static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Setting the views directory
app.set('views', path.join(__dirname, 'views'));

// Adding middleware for parsing URL-encoded requests
app.use(bodyParser.urlencoded({ extended: true }));

// Dummy array to store users (Consider using a database instead)
const users = [];

// Route for the home page
app.get('/', (req, res) => {
    res.render('index');
});

// Route for the login page
app.get('/login', (req, res) => {
    res.render('login');
});

// Route for the signup page
app.get('/signup', (req, res) => {
    res.render('signup');
});

// Route for the home page
app.get('/home', (req, res) => {
    res.render('home');
});

// Route for the modify page
app.get('/modify', (req, res) => {
    res.render('modify');
});

// Connecting to MongoDB Atlas
mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });

// Using userRoutes for '/api/user' endpoints and adminRoutes for '/api/admin' endpoints
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server started on port ' + port);
});
