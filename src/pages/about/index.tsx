import React from 'react';
/*
UseTables是view视图组件
searchForm是子组件的函数export 暴露searchForm函数就相当于父组件调用子组件
*/ 
import UseTables, { searchForm } from '@/pages/about/com/tables';
const AboutPage: React.FC = () => {
  const count = 100; // 定义要传递的count值
  const formdata={
    date:'2000-01-01',
    name:'张三',
    age:18,
    list:['a','b','c'],
  }
  
  const handleClick = () => {
    searchForm();
  };
  
  // 父组件的方法，将传递给子组件
  const parentMethod = (message: string) => {
    console.log('父组件方法被调用:', message);
    // alert('父组件方法被调用: ' + message);
  };
  
  return (
    <div>
      <h1>about页面</h1>
      <button onClick={handleClick}>调用子组件的searchForm函数</button>
      <UseTables count={count} formdata={formdata} parentMethod={parentMethod} />
    </div>
  );
};

export default AboutPage;
