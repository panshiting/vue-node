const express = require('express')
const mysql = require('mysql')
const app = express()
let stuSql = require('./sql')

let pool = mysql.createPool({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'test'
})
var responseJSON = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '-200',
      mag: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

// 列表
app.post('/api/stuList', (req, res, next) => {
  pool.getConnection((err, connection) => {
    // 获取前台页面传过来的参数
    // var param = req.query || req.params
    console.log(req.query)
    console.log(req.params)
    connection.query(stuSql.getAll, (err, result) => {
      let results
      if (result) {
        results = {
          respBody: {
            code: 200,
            stuList: result
          }
        }
      }
      responseJSON(res, results)
      connection.release()
    })
  })
})

// 按名字搜索
app.post('/api/stuList/name', (req, res, next) => {
  pool.getConnection((err, connection) => {
    // 获取前台页面传过来的参数
    var param = req.query || req.params
    console.log(req)
    console.log(req.query)
    console.log(req.params)
    connection.query(stuSql.getStuByName, param.name, (err, result) => {
      let results
      if (result) {
        results = {
          respBody: {
            code: 200,
            stuList: result
          }
        }
      }
      responseJSON(res, results)
      connection.release()
    })
  })
})

// connection.end()

app.listen(3000, function () {
  console.log('success listen at port: 3000')
})
