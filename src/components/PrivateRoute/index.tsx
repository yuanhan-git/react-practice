import { Navigate, Outlet, useLocation } from 'react-router-dom';

// 检查用户是否登录
const isAuthenticated = (): boolean => {
  // 从 localStorage 或 sessionStorage 获取 token
  const token = localStorage.getItem('token');
  return !!token;
};

const PrivateRoute: React.FC = () => {
  const location = useLocation();
  console.log('数据',location);
  const authenticated = isAuthenticated();

  if (!authenticated) {
    // 未登录，重定向到登录页，并记录当前路径以便登录后跳转回来
    return <Navigate to="/H5Login" state={{ from: location }} replace />;
  }

  // 已登录，渲染子路由内容
  return <Outlet />;
};

export default PrivateRoute;
