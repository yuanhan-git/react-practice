import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/home';
import About from '@/pages/about';
import Point from '@/pages/point';
import Login from '@/pages/login';
import NotFound from '@/pages/notFound';
import AI from '@/pages/AI';
import PrivateRoute from '@/components/PrivateRoute';
import H5Login from '@/pages/login/h5_index';
import HomeIndex from '@/pages/pc/home/index';
export default function AppRoutes() {
  return (
    <Routes>
      {/* 不需要登录的公开路由 */}
      <Route path="/H5Login" element={<H5Login />} />
      <Route path="/login" element={<Login />} />
       <Route path="/ai" element={<AI />} />
      {/* 需要登录才能访问的受保护路由 */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/point" element={<Point />} />
           <Route path="/homeindex" element={<HomeIndex />} />
      </Route>
      
      {/* 404 页面 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
