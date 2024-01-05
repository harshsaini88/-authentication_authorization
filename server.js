const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const config = require('./config/config');
const adminRoutes = require('./routes/adminRoutes')
const cookieParser = require('cookie-parser')
// const axios = require('axios');
// const cors = require('cors')

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());


// app.use(cors)
// app.use(authMiddleware);


app.set('view engine', 'ejs');
// app.use(express.static(__dirname+'/IS_ASSIGNMENT/'))
app.use('/uploads', express.static('uploads'));
app.set('views', 'G:\\IS_assignment\\views');
app.use(bodyParser.urlencoded({ extended: true }));

// Sample user data (replace this with your database logic)
const users = [];

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/modify', (req, res) => {
  res.render('modify');
});


// Connect to MongoDB Atlas
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


// API Routes
// app.use('/', dataRoute);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server started on port ' + port);
});
