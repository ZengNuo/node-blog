'use strict'

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  token: {
    type: String
  },
  name: {
    type: String,
    require: true
  },
  introduction: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  about: {
    type: String,
    require: true
  }
}, { collection: 'user' })

userSchema.pre('save', function (next) {
  var user = this
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err)
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err)
        }
        user.password = hash
        next()
      })
    })
  } else {
    return next()
  }
})

// 校验用户输入密码是否正确
userSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, (err, isMatch) => {
    if (err) {
      return cb(err)
    }
    cb(null, isMatch)
  })
}

const User = mongoose.model('User', userSchema)

export default User
