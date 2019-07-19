'use strict'

import ArticleModel from '../model/article'

class Article {
  async getArticles (req, res, next) {
    try {
      const page = req.query.page ? parseInt(req.query.page) : 1
      const limit = 9
      const dataCount = await ArticleModel.count({})
      const pageCount = Math.ceil(dataCount / limit)
      if (page < 1 || page > pageCount) {
        res.send({
          status: 0,
          message: '页数错误'
        })
      }
      const data = await ArticleModel.find({}, { title: 1, introduction: 1, type: 1, createdTime: 1 }, { sort: { '_id': -1 }, skip: (page - 1) * limit, limit: limit })
      if (data != null) {
        res.send({
          status: 1,
          data,
          pageCount: Math.ceil(dataCount / limit)
        })
      } else {
        throw Error()
      }
    } catch (err) {
      res.send({
        status: 0,
        message: '获取文章列表失败'
      })
    }
  }
  async addArticle (req, res, next) {
    try {
      const article = new ArticleModel(req.body)
      await article.save()
      res.send({
        status: 1,
        message: '添加文章成功'
      })
    } catch (err) {
      res.send({
        status: 0,
        message: '添加文章失败'
      })
    }
  }
  async getArticleDetail (req, res, next) {
    const articleId = req.query.id
    try {
      const data = await ArticleModel.findOne().where({ _id: articleId })
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
        message: '获取文章详情失败'
      })
    }
  }
  async updateArticle (req, res, next) {
    const articleId = req.query.id
    try {
      await ArticleModel.update({ _id: articleId }, req.body)
      res.send({
        status: 1,
        message: '修改文章成功'
      })
    } catch (err) {
      res.send({
        status: 0,
        message: '修改文章失败'
      })
    }
  }
  async deleteArticle (req, res, next) {
    const articleId = req.query.id
    try {
      await ArticleModel.remove({ _id: articleId })
      res.send({
        status: 1,
        message: '删除文章成功'
      })
    } catch (err) {
      res.send({
        status: 0,
        message: '删除文章失败'
      })
    }
  }
}

export default new Article()
