const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

//Schema for user data
const schema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

router.post('/register', async (req, res) => {
    //Validate user's input
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //checking if user exits
    const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [req.body.email]);
    if (user) {
        return res.status(400).send('User with this email already exists')
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Insert the new user into the database
    const newUser = await db.one('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', 
    [req.body.name, req.body.email, hashedPassword]);

    //TODO: Create and send a JWT

    res.send(newUser);
});

router.post('/login', async (req, res) => {
    //Validate user's input
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //check if user with provided email exists
    const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [req.body.email]);
    if (!user) {
        return res.status(400).send('Invalid email or password');
    }

    //Compare the password with the hashed password in the database
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Invalid email or password');
    }

    //Create a JWT and send it to the client
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h'});
    res.json({ token });
});

module.exports = router;   