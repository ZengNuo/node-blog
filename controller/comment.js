'use strict'

import CommentModel from '../model/comment'

class Comment {
  async getComments (req, res, next) {
    const articleId = req.query.id
    try {
      const page = req.query.page ? parseInt(req.query.page) : 1
      const limit = req.query.limit ? parseInt(req.query.limit) : 10
      const data = await CommentModel.find({ articleID: articleId }, { name: true, text: true, createdTime: true }, { skip: (page - 1) * limit, limit: limit })
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
        message: '获取评论列表失败'
      })
    }
  }
  async addComment (req, res, next) {
    try {
      const comment = new CommentModel(req.body)
      await comment.save()
      res.send({
        status: 1,
        message: '添加评论成功'
      })
    } catch (err) {
      res.send({
        status: 0,
        message: '添加评论失败'
      })
    }
  }
  async deleteComment (req, res, next) {
    const commentId = req.query.id
    try {
      await CommentModel.remove({ _id: commentId })
      res.send({
        status: 1,
        message: '删除评论成功'
      })
    } catch (err) {
      res.send({
        status: 0,
        message: '删除评论失败'
      })
    }
  }
}

export default new Comment()
