'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const articleSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  introduction: {
    type: String,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  text: {
    type: String,
    require: true
  },
  createdTime: Date,
  updatedTime: Date
}, { collection: 'article', timestamps: { createdAt: 'createdTime', updatedAt: 'updatedTime' } })

const Article = mongoose.model('Article', articleSchema)

export default Article
