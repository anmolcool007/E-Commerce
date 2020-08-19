const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// importing routes
const userRoutes = require('./routes/user');


// app
const app = express();

// database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log("Database connected"));

// routes middleware
app.use("/api", userRoutes);


const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});