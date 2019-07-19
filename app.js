import express from 'express'
import db from './mongodb/db'
import router from './router/index.js'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import passport from 'passport'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize()) // 初始化passport模块
app.use(morgan('dev'))

router(app)

app.listen(3000, () => console.log('http://localhost:3000/'))
