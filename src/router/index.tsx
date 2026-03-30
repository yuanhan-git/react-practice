import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import Home from '@/pages/home';
import NotFound from '@/pages/notFound';

// 权限验证组件
const PrivateRoute = () => {
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };
  
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

// 集中式路由配置
const router = createBrowserRouter([
  // 不需要登录的公开路由
  {
    path: "/",
    name: '后台管理',
    element: <Home />,
  },
  // 404 页面
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
