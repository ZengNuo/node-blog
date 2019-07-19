'use strict'

import express from 'express'
import Article from '../controller/article'
import checkAuth from '../middleware/checkAuth'

const router = express.Router()

router.get('/list', Article.getArticles)

router.post('/', checkAuth, Article.addArticle)
router.get('/', Article.getArticleDetail)
router.put('/', checkAuth, Article.updateArticle)
router.delete('/', checkAuth, Article.deleteArticle)

export default router
