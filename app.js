const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// app
const app = express();

// database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log("Database connected"));

// routes
app.get('/', (req, res) => {
    res.send('try');
});

const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});