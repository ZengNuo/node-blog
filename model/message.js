'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const messageSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  text: {
    type: String,
    require: true
  },
  createdTime: Date,
  updatedTime: Date
}, { collection: 'message', timestamps: { createdAt: 'createdTime', updatedAt: 'updatedTime' } })

const Message = mongoose.model('Message', messageSchema)

export default Message
