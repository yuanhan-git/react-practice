import React, { useState } from 'react';
import {
  Layout,
  Menu,
  Card,
  Statistic,
  List,
  Checkbox,
  Input,
  Button,
  Space,
  Avatar,
  Badge,
  DatePicker,
  Progress,
  Tooltip,
  Form,
  Select,
  Divider,
  Tag,
  Row,
  Col,
  Typography,
  Calendar
} from 'antd';
import {
  DashboardOutlined,
  CheckSquareOutlined,
  CalendarOutlined,
  BarChartOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  PlusOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
//   WorkOutlined,
  UserAddOutlined,
  StarOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface ScheduleItem {
  id: number;
  time: string;
  title: string;
  type: 'work' | 'personal' | 'important';
  description: string;
}

const PCHomePage: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, text: '完成项目报告', completed: false, priority: 'high' },
    { id: 2, text: '联系客户', completed: true, priority: 'medium' },
    { id: 3, text: '准备会议资料', completed: false, priority: 'medium' },
    { id: 4, text: '代码审查', completed: false, priority: 'low' },
    { id: 5, text: '更新文档', completed: true, priority: 'low' },
  ]);

  const [newTodo, setNewTodo] = useState('');
  const [newTodoPriority, setNewTodoPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const [schedules] = useState<ScheduleItem[]>([
    { id: 1, time: '09:00', title: '晨会', type: 'work', description: '团队每日站会' },
    { id: 2, time: '11:00', title: '项目评审', type: 'important', description: 'Q2 项目计划评审' },
    { id: 3, time: '14:00', title: '团队讨论', type: 'work', description: '技术方案讨论' },
    { id: 4, time: '16:30', title: '健身', type: 'personal', description: '健身房锻炼' },
  ]);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const stats = {
    tasks: { total: 12, completed: 8, pending: 4 },
    schedule: { today: 4, week: 15 },
    projects: { total: 3, completed: 1 },
    workHours: 8.5,
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false, priority: newTodoPriority }]);
      setNewTodo('');
      setNewTodoPriority('medium');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'default';
    }
  };

  const getScheduleTypeColor = (type: string) => {
    switch (type) {
      case 'work': return 'blue';
      case 'personal': return 'green';
      case 'important': return 'red';
      default: return 'default';
    }
  };

  const getScheduleTypeIcon = (type: string) => {
    switch (type) {
    //   case 'work': return <WorkOutlined />;
      case 'personal': return <UserAddOutlined />;
      case 'important': return <StarOutlined />;
      default: return <ClockCircleOutlined />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' ,width:'100vw'}}>
      {/* 侧边栏 */}
      <Sider theme="dark" width={256} style={{ position: 'fixed', height: '100vh' }}>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 18, fontWeight: 'bold' }}>
          个人管理系统
        </div>
        <Menu
          mode="inline"
          selectedKeys={[activeTab]}
          style={{ height: '100%', borderRight: 0, marginTop: 8 }}
          onSelect={({ key }) => setActiveTab(key)}
          items={[
            {
              key: 'dashboard',
              icon: <DashboardOutlined />,
              label: '仪表盘',
            },
            {
              key: 'tasks',
              icon: <CheckSquareOutlined />,
              label: '任务管理',
            },
            {
              key: 'schedule',
              icon: <CalendarOutlined />,
              label: '日程安排',
            },
            {
              key: 'stats',
              icon: <BarChartOutlined />,
              label: '数据统计',
            },
            {
              key: 'settings',
              icon: <SettingOutlined />,
              label: '个人设置',
            },
          ]}
        />
      </Sider>

      {/* 主内容区 */}
      <Layout style={{ marginLeft: 256 }}>
        {/* 顶部导航 */}
        <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <Title level={4} style={{ margin: 0, color: '#333' }}>
            {activeTab === 'dashboard' && '仪表盘'}
            {activeTab === 'tasks' && '任务管理'}
            {activeTab === 'schedule' && '日程安排'}
            {activeTab === 'stats' && '数据统计'}
            {activeTab === 'settings' && '个人设置'}
          </Title>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Space>
              <Tooltip title="通知">
                <Badge count={3} size="small">
                  <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
                </Badge>
              </Tooltip>
              <Text style={{ marginRight: 8 }}>张三</Text>
              <Button
                type="text"
                icon={<LogoutOutlined />}
                size="small"
                danger
              >
                退出登录
              </Button>
            </Space>
          </div>
        </Header>

        {/* 内容区域 */}
        <Content style={{ padding: 24, background: '#f0f2f5', minHeight: 'calc(100vh - 64px)' }}>
          {/* 仪表盘 */}
          {activeTab === 'dashboard' && (
            <>
              {/* 统计卡片 */}
              <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col span={6}>
                  <Card>
                    <Statistic
                      title="总任务数"
                      value={stats.tasks.total}
                      suffix={
                        <div style={{ fontSize: 12, color: '#52c41a' }}>
                          已完成 {stats.tasks.completed}
                        </div>
                      }
                      valueStyle={{ color: '#333' }}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card>
                    <Statistic
                      title="今日日程"
                      value={stats.schedule.today}
                      suffix={
                        <div style={{ fontSize: 12, color: '#1890ff' }}>
                          本周 {stats.schedule.week} 个
                        </div>
                      }
                      valueStyle={{ color: '#333' }}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card>
                    <Statistic
                      title="进行中项目"
                      value={stats.projects.total}
                      suffix={
                        <div style={{ fontSize: 12, color: '#faad14' }}>
                          完成 {stats.projects.completed}
                        </div>
                      }
                      valueStyle={{ color: '#333' }}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card>
                    <Statistic
                      title="今日工作时长"
                      value={stats.workHours}
                      suffix="小时"
                      valueStyle={{ color: '#333' }}
                    />
                    <div style={{ marginTop: 8, fontSize: 12, color: '#52c41a' }}>
                      超出目标 1.5 小时
                    </div>
                  </Card>
                </Col>
              </Row>

              {/* 待办事项和日程 */}
              <Row gutter={16}>
                <Col span={12}>
                  <Card
                    title={
                      <Space>
                        <CheckSquareOutlined />
                        待办事项
                        <Button type="text" size="small" onClick={() => setActiveTab('tasks')}>
                          查看全部
                        </Button>
                      </Space>
                    }
                    style={{ height: '100%' }}
                  >
                    <List
                      size="small"
                      dataSource={todos.slice(0, 5)}
                      renderItem={item => (
                        <List.Item
                          actions={[
                            <Button
                              key="delete"
                              type="text"
                              danger
                              size="small"
                              icon={<DeleteOutlined />}
                              onClick={() => deleteTodo(item.id)}
                            />
                          ]}
                        >
                          <List.Item.Meta
                            avatar={
                              <Checkbox
                                checked={item.completed}
                                onChange={() => toggleTodo(item.id)}
                              />
                            }
                            title={
                              <span style={{
                                textDecoration: item.completed ? 'line-through' : 'none',
                                color: item.completed ? '#999' : '#333'
                              }}>
                                {item.text}
                              </span>
                            }
                            description={
                              <Tag color={getPriorityColor(item.priority)} size="small">
                                {item.priority === 'high' && '高'}
                                {item.priority === 'medium' && '中'}
                                {item.priority === 'low' && '低'}
                                优先级
                              </Tag>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>

                <Col span={12}>
                  <Card
                    title={
                      <Space>
                        <CalendarOutlined />
                        今日日程
                        <Button type="text" size="small" onClick={() => setActiveTab('schedule')}>
                          查看全部
                        </Button>
                      </Space>
                    }
                    style={{ height: '100%' }}
                  >
                    <List
                      size="small"
                      dataSource={schedules}
                      renderItem={item => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <Tag color={getScheduleTypeColor(item.type)} icon={getScheduleTypeIcon(item.type)}>
                                {item.time}
                              </Tag>
                            }
                            title={item.title}
                            description={item.description}
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
              </Row>
            </>
          )}

          {/* 任务管理 */}
          {activeTab === 'tasks' && (
            <Card>
              <Card title="任务列表">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Space style={{ width: '100%' }}>
                    <Input
                      placeholder="添加新任务..."
                      value={newTodo}
                      onChange={(e) => setNewTodo(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                      style={{ flex: 1 }}
                    />
                    <Select
                      value={newTodoPriority}
                      onChange={(value) => setNewTodoPriority(value)}
                      style={{ width: 120 }}
                    >
                      <Option value="low">低优先级</Option>
                      <Option value="medium">中优先级</Option>
                      <Option value="high">高优先级</Option>
                    </Select>
                    <Button type="primary" icon={<PlusOutlined />} onClick={addTodo}>
                      添加
                    </Button>
                  </Space>

                  <Divider />

                  <List
                    dataSource={todos}
                    renderItem={item => (
                      <List.Item
                        actions={[
                          <Button
                            key="delete"
                            type="text"
                            danger
                            size="small"
                            icon={<DeleteOutlined />}
                            onClick={() => deleteTodo(item.id)}
                          />
                        ]}
                      >
                        <List.Item.Meta
                          avatar={
                            <Checkbox
                              checked={item.completed}
                              onChange={() => toggleTodo(item.id)}
                            />
                          }
                          title={
                            <span style={{
                              textDecoration: item.completed ? 'line-through' : 'none',
                              color: item.completed ? '#999' : '#333'
                            }}>
                              {item.text}
                            </span>
                          }
                          description={
                            <Tag color={getPriorityColor(item.priority)}>
                              {item.priority === 'high' && '高'}
                              {item.priority === 'medium' && '中'}
                              {item.priority === 'low' && '低'}
                              优先级
                            </Tag>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Space>
              </Card>
            </Card>
          )}

          {/* 日程安排 */}
          {activeTab === 'schedule' && (
            <Card>
              <Card title="日程安排">
                <Row gutter={16} style={{ marginBottom: 16 }}>
                  <Col flex="auto">
                    <DatePicker
                      value={selectedDate}
                      onChange={(date) => setSelectedDate(date || new Date())}
                      style={{ width: 200 }}
                    />
                  </Col>
                  <Col>
                    <Button type="primary" icon={<PlusOutlined />}>
                      添加日程
                    </Button>
                  </Col>
                </Row>

                <List
                  bordered
                  dataSource={schedules}
                  renderItem={item => (
                    <List.Item
                      extra={
                        <Tag color={getScheduleTypeColor(item.type)} icon={getScheduleTypeIcon(item.type)}>
                          {item.type === 'work' && '工作'}
                          {item.type === 'personal' && '个人'}
                          {item.type === 'important' && '重要'}
                        </Tag>
                      }
                    >
                      <List.Item.Meta
                        title={
                          <Space>
                            <ClockCircleOutlined />
                            <Text strong>{item.time}</Text>
                            <Text>{item.title}</Text>
                          </Space>
                        }
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />

                <Divider style={{ margin: '24px 0' }} />

                <Calendar
                  value={selectedDate}
                  onChange={(date) => setSelectedDate(date || new Date())}
                  style={{ width: '100%' }}
                />
              </Card>
            </Card>
          )}

          {/* 数据统计 */}
          {activeTab === 'stats' && (
            <Row gutter={16}>
              <Col span={12}>
                <Card title="任务完成情况">
                  <Row gutter={16} align="middle">
                    <Col span={8}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ marginBottom: 8 }}>
                          <Progress type="circle" percent={Math.round((stats.tasks.completed / stats.tasks.total) * 100)} size={120} />
                        </div>
                        <Text strong>完成率</Text>
                      </div>
                    </Col>
                    <Col span={16}>
                      <List
                        size="small"
                        dataSource={[
                          { label: '已完成', value: stats.tasks.completed, color: '#52c41a' },
                          { label: '进行中', value: stats.tasks.pending, color: '#faad14' },
                          { label: '总任务', value: stats.tasks.total, color: '#1890ff' },
                        ]}
                        renderItem={item => (
                          <List.Item>
                            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                              <Text>{item.label}</Text>
                              <Text style={{ color: item.color, fontWeight: 'bold' }}>{item.value}</Text>
                            </Space>
                          </List.Item>
                        )}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="周工作统计">
                  <Row gutter={16} style={{ height: 200, alignItems: 'flex-end' }}>
                    {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((day, index) => {
                      const height = Math.random() * 100 + 20;
                      return (
                        <Col key={day} span={3} style={{ textAlign: 'center' }}>
                          <div style={{ height: 120, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                            <div
                              style={{
                                width: 24,
                                height: `${height}%`,
                                backgroundColor: index < 5 ? '#1890ff' : '#52c41a',
                                borderRadius: '4px 4px 0 0',
                                transition: 'height 0.3s'
                              }}
                            />
                          </div>
                          <Text style={{ marginTop: 8, display: 'block', fontSize: 12 }}>{day}</Text>
                        </Col>
                      );
                    })}
                  </Row>
                </Card>
              </Col>
            </Row>
          )}

          {/* 个人设置 */}
          {activeTab === 'settings' && (
            <Card title="个人设置">
              <Form layout="vertical" style={{ maxWidth: 600 }}>
                <Form.Item
                  name="username"
                  label="用户名"
                  rules={[{ required: true, message: '请输入用户名' }]}
                  initialValue="张三"
                >
                  <Input />
                </Form.Item>
                
                <Form.Item
                  name="email"
                  label="邮箱"
                  rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入有效的邮箱地址' }]}
                  initialValue="zhangsan@example.com"
                >
                  <Input />
                </Form.Item>
                
                <Form.Item
                  name="phone"
                  label="手机号"
                  rules={[{ required: true, message: '请输入手机号' }]}
                  initialValue="138****8888"
                >
                  <Input />
                </Form.Item>
                
                <Form.Item
                  name="position"
                  label="职位"
                  rules={[{ required: true, message: '请输入职位' }]}
                  initialValue="前端开发工程师"
                >
                  <Input />
                </Form.Item>
                
                <Form.Item
                  name="department"
                  label="部门"
                  initialValue="技术部"
                >
                  <Select>
                    <Option value="tech">技术部</Option>
                    <Option value="product">产品部</Option>
                    <Option value="design">设计部</Option>
                    <Option value="marketing">市场部</Option>
                  </Select>
                </Form.Item>
                
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    保存修改
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default PCHomePage;
