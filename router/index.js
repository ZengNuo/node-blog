'use strict'

import article from './article'
import user from './user'
import comment from './comment'
import message from './message'

export default app => {
  app.use('/user', user)
  app.use('/article', article)
  app.use('/comment', comment)
  app.use('/message', message)
}
