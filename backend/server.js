require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const usersRouter = require('./routes/users');
const habitsRouter = require('./routes/habits');

//Middleware
app.use(express.json());

//Routes
app.use('/api/users', usersRouter);
app.use('/api/habits', habitsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});