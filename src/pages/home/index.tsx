import React from 'react';
import { MenuFoldOutlined ,QqOutlined} from '@ant-design/icons';
import { Button, Popover } from 'antd';
import './index.less'
import MenuPage from './com/menu.tsx'
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);
const HomePage: React.FC = () => {
  return (
    <div className="home_body">
      <div className="left_tab">
         <MenuPage  />
      </div>
      <div className="right">
        {/* 右侧顶部 */}
        <div className='right_top'>
          <div>
            <MenuFoldOutlined /> 管理系统
          </div>
          <div>
            <Popover content={content} title="Title">
              <QqOutlined />
              <span >root管理员</span>
            </Popover>
          </div>
        </div>
        {/* 右侧主体 */}
        <div className='right_body'>

        </div>
      </div>
    </div>
  );
};

export default HomePage;