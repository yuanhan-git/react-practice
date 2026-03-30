import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {queryLogin} from '@/api/login';
const H5LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 获取之前尝试访问的页面路径
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // 简单表单验证
    if (!formData.username || !formData.password) {
      setError('请输入用户名和密码');
      return;
    }

    setLoading(true);
    
    try {
        const res = await queryLogin(formData);
        console.log(res)
        // setError('成功');
      // 模拟登录请求
    //   await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 登录成功，保存 token
      localStorage.setItem('token', res.token);
      
      // 跳转到之前尝试访问的页面或首页
      navigate(from, { replace: true });
    } catch (err) {
      setError('登录失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
    //   minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f5f5f5',
      width: '100vw'
    }}>
      {/* 顶部导航栏 */}
      <div style={{
        height: '50px',
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <h1 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#333'
        }}>用户登录</h1>
      </div>

      {/* 登录表单 */}
      <div style={{
        flex: 1,
        padding: '20px',
        maxWidth: '400px',
        margin: '0 auto',
        width: '100%'
      }}>
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <form onSubmit={handleSubmit}>
            {/* 错误提示 */}
            {error && (
              <div style={{
                backgroundColor: '#fff2f0',
                border: '1px solid #ffccc7',
                color: '#f5222d',
                padding: '10px',
                borderRadius: '4px',
                marginBottom: '16px',
                fontSize: '14px'
              }}>
                {error}
              </div>
            )}

            {/* 用户名输入 */}
            <div style={{
              marginBottom: '16px'
            }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                color: '#333',
                marginBottom: '8px',
                fontWeight: '500'
              }}>用户名</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="请输入用户名"
                style={{
                  width: '100%',
                  height: '44px',
                  padding: '0 12px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '4px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* 密码输入 */}
            <div style={{
              marginBottom: '24px'
            }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                color: '#333',
                marginBottom: '8px',
                fontWeight: '500'
              }}>密码</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="请输入密码"
                style={{
                  width: '100%',
                  height: '44px',
                  padding: '0 12px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '4px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* 登录按钮 */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                height: '44px',
                backgroundColor: '#1890ff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
                transition: 'all 0.3s'
              }}
            >
              {loading ? '登录中...' : '登录'}
            </button>
          </form>
        </div>

        {/* 其他链接 */}
        <div style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '14px'
        }}>
          <a href="#" style={{
            color: '#1890ff',
            textDecoration: 'none'
          }}>忘记密码？</a>
          <a href="#" style={{
            color: '#1890ff',
            textDecoration: 'none'
          }}>注册账号</a>
        </div>
      </div>

      {/* 底部信息 */}
      <div style={{
        padding: '20px',
        textAlign: 'center',
        fontSize: '12px',
        color: '#999'
      }}>
        <p>© 2026 My App. 保留所有权利</p>
      </div>
    </div>
  );
};

export default H5LoginPage;
