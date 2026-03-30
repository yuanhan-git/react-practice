import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // 获取之前尝试访问的页面路径
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const handleLogin = async () => {
    setLoading(true);
    
    // 模拟登录请求
    setTimeout(() => {
      // 登录成功，保存 token
      localStorage.setItem('token', 'fake-token-123456');
      
      // 跳转到之前尝试访问的页面或首页
      navigate(from, { replace: true });
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      height: '100vh'
    }}>
      <h1>登录页面</h1>
      <p>请先登录才能访问其他页面</p>
      <button 
        onClick={handleLogin}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? '登录中...' : '点击登录'}
      </button>
    </div>
  );
};

export default LoginPage;
