'use strict'

const Config = {
  'secret': 'ThisIsASecret', // used when we create and verify JSON Web Tokens
  'database': 'mongodb://localhost:27017/test' // 填写本地自己 mongodb 连接地址,xxx为数据表名
}

export default Config
