const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
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

// ajax提交json数据
app.use(bodyParser.json())
// form表单提交时
app.use(bodyParser.urlencoded({
  extended: false,
  limit: 2 * 1024 * 1024
}))

// 获取列表，支持模糊查询
app.post('/api/stuList', (req, res, next) => {
  pool.getConnection((err, connection) => {
    // 获取前台页面传过来的参数
    var param = req.body
    connection.query(stuSql.getStuByName, ['%' + param.name + '%'], (err, result) => {
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

// 添加/更新数据
app.post('/api/stuList/add', (req, res, next) => {
  pool.getConnection((err, connection) => {
    // 获取前台页面传过来的参数
    var param = req.body
    let url = ''
    if (param.id) {
      url = stuSql.update
    } else {
      url = stuSql.insert
    }
    connection.query(url, [param.name, param.age, param.sex, param.id], (err, result) => {
      let results
      if (result) {
        results = {
          respHeader: {
            message: '正确执行',
            resultCode: 0
          }
        }
      }
      responseJSON(res, results)
      connection.release()
    })
  })
})

// 根据id获取详情
app.get('/api/stuList/detail/:id', (req, res, next) => {
  pool.getConnection((err, connection) => {
    // 获取前台页面传过来的参数
    var param = req.params
    connection.query(stuSql.getStuById, [param.id], (err, result) => {
      let results
      if (result) {
        results = {
          respBody: {
            code: 200,
            stu: result[0]
          }
        }
      }
      responseJSON(res, results)
      connection.release()
    })
  })
})

// 删除数据
app.get('/api/stuList/delete/:id', (req, res, next) => {
  pool.getConnection((err, connection) => {
    // 获取前台页面传过来的参数
    var param = req.params
    connection.query(stuSql.delete, [param.id], (err, result) => {
      let results
      if (result) {
        results = {
          respHeader: {
            message: '正确执行',
            resultCode: 0
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
