require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('./models');
const express = require('express');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT;
const jwt = require('jsonwebtoken');

const usersRouter = require('./routes/users');
const habitsRouter = require('./routes/habits');

// Middleware
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/api/users/google/callback"
  },

  async (accessToken, refreshToken, profile, done) => {
    try {
      // Find or create user in the database
      let user = await User.findOne({ where: { email: profile.emails[0].value } });
      if (!user) {
        // If user does not exist, create a new one
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: null // No password needed for Google login
        });
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

// Routes
app.use('/api/users', usersRouter);
app.use('/api/habits', habitsRouter);

// Google Authentication Routes
app.get('/api/users/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/api/users/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, generate JWT and send it to the user
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  }
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
