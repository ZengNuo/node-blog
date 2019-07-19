'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
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
  articleID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  },
  createdTime: Date,
  updatedTime: Date
}, { collection: 'comment', timestamps: { createdAt: 'createdTime', updatedAt: 'updatedTime' } })

const Comment = mongoose.model('Comment', commentSchema)

export default Comment
