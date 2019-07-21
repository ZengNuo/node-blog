'use strict'

import article from './article'
import user from './user'
import comment from './comment'
import message from './message'

export default app => {
  app.use('/api/user', user)
  app.use('/api/article', article)
  app.use('/api/comment', comment)
  app.use('/api/message', message)
}
