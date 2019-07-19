'use strict'

import express from 'express'
import User from '../controller/user'
import checkAuth from '../middleware/checkAuth'

const router = express.Router()

// router.post('/register', User.Register)
router.post('/login', User.Login)
router.get('/profile', User.getProfile)
router.put('/profile', checkAuth, User.updateProfile)
router.get('/checkauth', User.checkAuth)

export default router
