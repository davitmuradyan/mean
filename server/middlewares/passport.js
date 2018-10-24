const jwtStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const { JWT_SECRET_KEY } = require('../constants/constants')

const options = {
        secretOrKey: JWT_SECRET_KEY,
        jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken()
    }

module.exports = passport => {
    passport.use(new jwtStrategy(options, 
        async (payload, done) => {
            try {
                console.log(payload)
                done(null, payload)
              } catch (e) {
                console.log(e)
              }
        })
    )
    
}