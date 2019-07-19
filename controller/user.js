'use strict'

import UserModel from '../model/user'
import jwt from 'jsonwebtoken'
import config from '../config'

class User {
  async Register (req, res, next) {
    try {
      const User = new UserModel(req.body)
      User.save()
      res.send({
        status: 1,
        message: '注册用户成功'
      })
    } catch (err) {
    }
  }
  async Login (req, res, next) {
    try {
      await UserModel.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
          throw err
        }
        if (!user) {
          res.send({
            status: 0,
            message: '用户不存在'
          })
        } else if (user) {
          user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
              var token = jwt.sign({ username: user.username }, config.secret, {
                expiresIn: 86400 // token 过期销毁时间设置
              })
              user.token = token
              user.save(function (err) {
                if (err) {
                  res.send({
                    status: 0,
                    message: '验证失败'
                  })
                }
              })
              res.send({
                status: 1,
                message: '登录成功',
                token: 'Bearer ' + token,
                username: user.username
              })
            } else {
              res.send({
                status: 0,
                message: '密码错误'
              })
            }
          })
        }
      })
    } catch (err) {
      res.send({
        status: 0,
        message: '登录失败'
      })
    }
  }
  async getProfile (req, res, next) {
    try {
      const profile = await UserModel.findOne({}, { name: true, introduction: true, title: true, about: true }, {})
      res.send({
        status: 1,
        data: profile
      })
    } catch (err) {
      res.send({
        status: 0,
        message: '获取用户信息失败'
      })
    }
  }
  async updateProfile (req, res, next) {
    const token = req.get('Authorization').replace('Bearer ', '')
    try {
      await UserModel.update({ token: token }, req.body)
      res.send({
        status: 1,
        message: '更新用户信息成功'
      })
    } catch (err) {
      res.send({
        status: 0,
        message: '更新用户信息失败'
      })
    }
  }
  async checkAuth (req, res, next) {
    const token = req.query.token.replace('Bearer ', '')
    try {
      const user = await UserModel.findOne({ token: token })
      if (user) {
        res.send({
          status: 1,
          message: '验证成功'
        })
      } else {
        res.send({
          status: 0,
          message: '验证失败'
        })
      }
    } catch (err) {
    }
  }
}

export default new User()
