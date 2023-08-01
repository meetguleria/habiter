const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    //TODO: input validation will come here

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

router.post('/login', (req, res) => {

});

module.exports = router;