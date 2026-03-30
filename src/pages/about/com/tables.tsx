import React from 'react';

interface UseTablesProps {
  count: number;
  formdata: {
    date: string;
    name: string;
    age: number;
    list: string[];
  };
  parentMethod: (message: string) => void;
}
// 父组件调用子组件，当前函数是子组件函数
export const searchForm = ()=>{
    console.log('我是子组件tables里的事件函数');
}

const UseTables: React.FC<UseTablesProps> = ({ count, formdata, parentMethod }) => {
  const handleCallParent = () => {
    parentMethod('来自子组件的消息');
  };
  
  return (
    <div>
      <h1>子组件tables</h1>
      <p>接收到的count: {count}</p>
      <h2>接收到的formdata:</h2>
      <ul>
        <li>date: {formdata.date}</li>
        <li>name: {formdata.name}</li>
        <li>age: {formdata.age}</li>
        <li>list: {formdata.list.join(', ')}</li>
      </ul>
      <button onClick={handleCallParent}>调用父组件方法</button>
    </div>
  );
};

export default UseTables;
