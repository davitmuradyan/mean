const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { JWT_SECRET_KEY } = require('../constants/constants');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const options = {
  secretOrKey: JWT_SECRET_KEY,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
};

module.exports = (passport) => {
  passport.use(new jwtStrategy(
    options,
    async (payload, done) => {
      const user = await User.findById(payload._id).select("_id username type");

      if (user) {
        done(null, payload);
      } else {
        done(null, false);
      }

    }
  ));
};
