'use strict'

import express from 'express'
import Comment from '../controller/comment'
import checkAuth from '../middleware/checkAuth'

const router = express.Router()

router.get('/list', Comment.getComments)

router.post('/', Comment.addComment)
router.delete('/', checkAuth, Comment.deleteComment)

export default router
