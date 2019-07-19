'use strict'

import MessageModel from '../model/message'

class Message {
  async getMessages (req, res, next) {
    try {
      const page = req.query.page ? parseInt(req.query.page) : 1
      const limit = req.query.limit ? parseInt(req.query.limit) : 5
      const data = await MessageModel.find({}, null, { skip: (page - 1) * limit, limit: limit })
      if (data != null) {
        res.send({
          status: 1,
          data
        })
      } else {
        throw Error()
      }
    } catch (err) {
      res.send({
        status: 0,
        message: '获取留言列表失败'
      })
    }
  }
  async addMessage (req, res, next) {
    try {
      const message = new MessageModel(req.body)
      await message.save()
      res.send({
        status: 1,
        message: '添加留言成功'
      })
    } catch (err) {
      res.send({
        status: 0,
        message: '添加留言失败'
      })
    }
  }
  async deleteMessage (req, res, next) {
    const messageId = req.query.id
    try {
      await MessageModel.remove({ _id: messageId })
      res.send({
        status: 1,
        message: '删除留言成功'
      })
    } catch (err) {
      res.send({
        status: 0,
        message: '删除留言失败'
      })
    }
  }
}

export default new Message()
