import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';
import rootRouter from './node_routers/index.js';// 引入根路由模块

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
let users = [
  { id: 1, name: 'admin', password: '123456', email: 'admin@example.com' },
]
// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件服务（用于生产环境）
app.use(express.static(join(__dirname, 'dist')));

// 挂载所有路由到 /api 前缀
app.use('/api', rootRouter);
// 启动服务器
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
