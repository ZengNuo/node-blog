import mongoose from 'mongoose'
import chalk from 'chalk'

/*
 * mongoose从@5.2.8后会弃用一些指令，为防止程序如下警告：
 * (node:24864) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
 * (node:24841) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to 
 * 通过配置 {useNewUrlParser:true,useCreateIndex: true} 来连接
*/
mongoose.connect('mongodb://localhost:27017/Blog', { useNewUrlParser: true, useCreateIndex: true })

const db = mongoose.connection

db.once('open', () => {
  console.log(
    chalk.green('连接数据库成功')
  )
})

db.on('error', function (error) {
  console.error(
    chalk.red('Error in MongoDb connection: ' + error)
  )
  mongoose.disconnect()
})

db.on('close', function () {
  console.log(
    chalk.red('数据库断开，重新连接数据库')
  )
  mongoose.connect('mongodb://localhost:27017/Blog', { server: { auto_reconnect: true, useNewUrlParser: true, useCreateIndex: true } })
})

export default db
