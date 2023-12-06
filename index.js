import express from 'express';

const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());
// 静态文件目录，用于提供静态资源，例如 HTML、CSS 和 JavaScript 文件
app.use(express.static('public'));

// 处理根路径请求，并路由到主页面
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});
