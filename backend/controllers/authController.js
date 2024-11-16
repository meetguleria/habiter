const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authController = {
  googleCallback: async (req, res) => {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: 'No token provided' });
    }

    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const email = payload.email;

      // Find or create user in the database
      let user = await User.findOne({ where: { email } });
      if (!user) {
        user = await User.create({
          name: payload.name,
          email,
          password: null,
        });
      }

      // Generate JWT
      const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token: jwtToken });
    } catch (error) {
      console.error('Google login error:', error);
      res.status(500).send('Server error');
    }
  },
};

module.exports = authController;
