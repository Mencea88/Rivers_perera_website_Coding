const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected!'))
    .catch(err => console.error('Database connection error:', err));

// Define User Schema and Model (Now unused for authentication purposes)
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', userSchema);

// Create Express app and middlewares
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve HTML Pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// User Sign-up (Now just stores a dummy user entry)
app.post('/signup', async (req, res) => {
    try {
        // Dummy user creation (no validation or checks)
        const newUser = new User({ username: 'dummyUser', password: 'dummyPassword' });
        await newUser.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error signing up: ' + err);
    }
});

// User Login (Now directly redirects to dashboard)
app.post('/login', (req, res) => {
    res.redirect('/dashboard');
});

// Dashboard route
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Start Server
const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
