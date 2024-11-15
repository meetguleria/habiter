require('dotenv').config();
const cors = require('cors');
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
const progressRouter = require('./routes/progress');
const authRouter = require('./routes/auth');

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://accounts.google.com'],
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));

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
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/api/users/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ where: { email: profile.emails[0].value } });
      if (!user) {
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: null, // Google users don't need a password in your system
        });
      }
      return done(null, user); // Pass the user to the next step
    } catch (err) {
      return done(err, null);
    }
  }
));

// Configure Passport serialization
passport.serializeUser((user, done) => {
  console.log("Serializing user:", user);
  done(null, user.id); // Save user ID to session
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log("Deserializing user with ID:", id);
    const user = await User.findByPk(id); // Retrieve user by ID
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Routes
app.use('/api/users', usersRouter);
app.use('/api/habits', habitsRouter);
app.use('/api/progress', progressRouter);
app.use('/api/auth', authRouter);

// Google Authentication Routes
app.get('/api/users/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/api/users/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Redirect the user to the frontend with the token as a query parameter
    res.redirect(`http://localhost:5173/oauth-callback?token=${token}`);
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
