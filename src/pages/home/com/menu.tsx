import React, { useState } from 'react';
import type { MenuProps, MenuTheme } from 'antd';
import { Menu } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[]= [
  {
    key: 'sub1',
    label: '系统管理',
    icon: '',
    children: [
      { key: '2', label: '用户管理' },
      { key: '3', label: '角色管理' },
      { key: '4', label: '菜单管理' },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: '',
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '7', label: 'Option 7' },
          { key: '8', label: 'Option 8' },
        ],
      },
    ],
  },
  {
    key: 'sub4',
    label: 'Navigation Three',
    icon: '',
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      { key: '11', label: 'Option 11' },
      { key: '12', label: 'Option 12' },
    ],
  },
];

const MenuPage: React.FC = () => {
    const [theme] = useState<MenuTheme>('light');
    const [current, setCurrent] = useState('1');
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
  return (
    <div className="home_body">
       <Menu
            theme={theme}
            onClick={onClick}
            // style={{ width: 256 }}
            defaultOpenKeys={['sub1']}
            selectedKeys={[current]}
            mode="inline"
            items={items}
        />
    </div>
  );
};

export default MenuPage;