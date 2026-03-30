import express from 'express';
const router = express.Router();

// // 动态导入模块路由
// import systemRouter from './system/system.router.js';
// import menuRouter from './menu/menu.router.js';

// // 挂载模块路由到根路径
// router.use('/system', systemRouter);  // 系统模块挂载到 /api/system
// router.use('/menu', menuRouter);     // 菜单模块挂载到 /api/menu

export default router;
