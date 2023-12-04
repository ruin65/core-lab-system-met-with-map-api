import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

// 提供静态文件服务
app.use(express.static('public')); // 假设您的前端文件在 'public' 目录

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});
