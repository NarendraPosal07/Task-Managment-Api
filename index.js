require('dotenv').config;

const mongoose = require('mongoose');

const express = require('express');

const app = express();

const db = require('./db/database');

db

const authRoute = require('./routes/authRoute');
app.use('/api', authRoute);

const adminRoute = require('./routes/adminRoute');
app.use('/api/admin', adminRoute);

app.use(express.json());

app.use(express.static('public'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})
