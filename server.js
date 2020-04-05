const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

// 启动静态资源服务
app.use(express.static('build'))

// 实现后台接口
app.get('/data', (req, res) => {
  res.json({
    uname: 'lisi',
    age: 12,
    gender: 'male'
  })
})

// 监听所有的客户端请求，这些请求响应的内容：返回主页面内容信息
app.all('*', (req, res) => {
  let indexPath = path.join(__dirname,  './build/index.html');
  let index = fs.readFileSync(indexPath, 'utf-8');
  res.send(index);
});

app.listen(9999, () => {
  console.log('running...')
})