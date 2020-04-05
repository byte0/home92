const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

// 启动静态资源服务
app.use(express.static('build'))

// 监听所有的客户端请求，这些请求响应的内容：返回主页面内容信息
app.all('*', (req, res) => {
  let indexPath = path.join(__dirname,  './build/index.html');
  let index = fs.readFileSync(indexPath, 'utf-8');
  res.send(index);
});

app.listen(3000, () => {
  console.log('running...')
})