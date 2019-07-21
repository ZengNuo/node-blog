'use strict'

import passport from 'passport'
import User from '../model/user'
const Strategy = require('passport-http-bearer').Strategy

passport.use(new Strategy(
  function (token, done) {
    User.findOne({
      token: token
    }, function (err, user) {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false)
      }
      return done(null, user)
    })
  }
))

export default passport.authenticate('bearer', { session: false })
