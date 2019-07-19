'use strict'

import express from 'express'
import Message from '../controller/message'
import checkAuth from '../middleware/checkAuth'

const router = express.Router()

router.get('/list', Message.getMessages)

router.post('/', Message.addMessage)
router.delete('/', checkAuth, Message.deleteMessage)

export default router
