import React, { useState } from 'react';
import { Button } from 'antd';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

interface ScheduleItem {
  id: number;
  time: string;
  title: string;
  type: 'work' | 'personal' | 'important';
}

const PCHomePage: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, text: '完成项目报告', completed: false },
    { id: 2, text: '联系客户', completed: true },
    { id: 3, text: '准备会议资料', completed: false },
  ]);

  const [newTodo, setNewTodo] = useState('');

  const [schedules] = useState<ScheduleItem[]>([
    { id: 1, time: '09:00', title: '晨会', type: 'work' },
    { id: 2, time: '11:00', title: '项目评审', type: 'important' },
    { id: 3, time: '14:00', title: '团队讨论', type: 'work' },
    { id: 4, time: '16:30', title: '健身', type: 'personal' },
  ]);

  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = {
    tasks: { total: 12, completed: 8, pending: 4 },
    schedule: { today: 4, week: 15 },
    projects: { total: 3, completed: 1 },
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const getScheduleTypeColor = (type: string) => {
    switch (type) {
      case 'work': return '#1890ff';
      case 'personal': return '#52c41a';
      case 'important': return '#fa541c';
      default: return '#1890ff';
    }
  };

  return (
    <div style={styles.container}>
      {/* 侧边栏 */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>
          <h2>管理系统</h2>
        </div>
        <nav style={styles.nav}>
          <div
            style={{ ...styles.navItem, ...(activeTab === 'dashboard' ? styles.navItemActive : {}) }}
            onClick={() => setActiveTab('dashboard')}
          >
            <span style={styles.navIcon}>📊</span>
            仪表盘
          </div>
          <div
            style={{ ...styles.navItem, ...(activeTab === 'tasks' ? styles.navItemActive : {}) }}
            onClick={() => setActiveTab('tasks')}
          >
            <span style={styles.navIcon}>✅</span>
            任务管理
          </div>
          <div
            style={{ ...styles.navItem, ...(activeTab === 'schedule' ? styles.navItemActive : {}) }}
            onClick={() => setActiveTab('schedule')}
          >
            <span style={styles.navIcon}>📅</span>
            日程安排
          </div>
          <div
            style={{ ...styles.navItem, ...(activeTab === 'stats' ? styles.navItemActive : {}) }}
            onClick={() => setActiveTab('stats')}
          >
            <span style={styles.navIcon}>📈</span>
            数据统计
          </div>
          <div
            style={{ ...styles.navItem, ...(activeTab === 'settings' ? styles.navItemActive : {}) }}
            onClick={() => setActiveTab('settings')}
          >
            <span style={styles.navIcon}>⚙️</span>
            个人设置
          </div>
        </nav>
      </aside>

      {/* 主内容区 */}
      <main style={styles.main}>
        {/* 顶部导航 */}
        <header style={styles.header}>
          <h1 style={styles.headerTitle}>
            {activeTab === 'dashboard' && '仪表盘'}
            {activeTab === 'tasks' && '任务管理'}
            {activeTab === 'schedule' && '日程安排'}
            {activeTab === 'stats' && '数据统计'}
            {activeTab === 'settings' && '个人设置'}
          </h1>
          <div style={styles.headerRight}>
            <span style={styles.userInfo}>欢迎，张三</span>
            <button style={styles.logoutBtn}>退出登录</button>
          </div>
        </header>

        {/* 内容区域 */}
        <div style={styles.content}>
          {/* 仪表盘 */}
          {activeTab === 'dashboard' && (
            <>
              {/* 统计卡片 */}
              <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                  <div style={styles.statIcon}>📝</div>
                  <div style={styles.statInfo}>
                    <div style={styles.statValue}>{stats.tasks.total}</div>
                    <div style={styles.statLabel}>总任务数</div>
                  </div>
                  <div style={styles.statFooter}>
                    <span style={styles.statSuccess}>已完成 {stats.tasks.completed}</span>
                  </div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statIcon}>📅</div>
                  <div style={styles.statInfo}>
                    <div style={styles.statValue}>{stats.schedule.today}</div>
                    <div style={styles.statLabel}>今日日程</div>
                  </div>
                  <div style={styles.statFooter}>
                    <span style={styles.statInfoText}>本周 {stats.schedule.week} 个</span>
                  </div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statIcon}>🚀</div>
                  <div style={styles.statInfo}>
                    <div style={styles.statValue}>{stats.projects.total}</div>
                    <div style={styles.statLabel}>进行中项目</div>
                  </div>
                  <div style={styles.statFooter}>
                    <span style={styles.statWarning}>完成 {stats.projects.completed}</span>
                  </div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statIcon}>⏱️</div>
                  <div style={styles.statInfo}>
                    <div style={styles.statValue}>8.5h</div>
                    <div style={styles.statLabel}>今日工作时长</div>
                  </div>
                  <div style={styles.statFooter}>
                    <span style={styles.statSuccess}>超出目标 1.5h</span>
                  </div>
                </div>
              </div>

              {/* 待办事项和日程 */}
              <div style={styles.sectionGrid}>
                <div style={styles.card}>
                  <div style={styles.cardHeader}>
                    <h3>待办事项</h3>
                    <button style={styles.addBtn} onClick={() => setActiveTab('tasks')}>查看全部</button>
                  </div>
                  <div style={styles.todoList}>
                    {todos.slice(0, 3).map(todo => (
                      <div key={todo.id} style={styles.todoItem}>
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodo(todo.id)}
                          style={styles.checkbox}
                        />
                        <span style={{
                          ...styles.todoText,
                          textDecoration: todo.completed ? 'line-through' : 'none',
                          color: todo.completed ? '#999' : '#333'
                        }}>
                          {todo.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={styles.card}>
                  <div style={styles.cardHeader}>
                    <h3>今日日程</h3>
                    <button style={styles.addBtn} onClick={() => setActiveTab('schedule')}>查看全部</button>
                  </div>
                  <div style={styles.scheduleList}>
                    {schedules.map(schedule => (
                      <div key={schedule.id} style={styles.scheduleItem}>
                        <div style={{
                          ...styles.scheduleTime,
                          borderLeftColor: getScheduleTypeColor(schedule.type)
                        }}>
                          {schedule.time}
                        </div>
                        <div style={styles.scheduleTitle}>{schedule.title}</div>
                        <div style={{
                          ...styles.scheduleTag,
                          backgroundColor: getScheduleTypeColor(schedule.type) + '20',
                          color: getScheduleTypeColor(schedule.type)
                        }}>
                          {schedule.type === 'work' && '工作'}
                          {schedule.type === 'personal' && '个人'}
                          {schedule.type === 'important' && '重要'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* 任务管理 */}
          {activeTab === 'tasks' && (
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3>任务列表</h3>
              </div>
              <div style={styles.addTask}>
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                  placeholder="添加新任务..."
                  style={styles.addInput}
                />
                <button onClick={addTodo} style={styles.addTaskBtn}>添加</button>
              </div>
              <div style={styles.todoList}>
                {todos.map(todo => (
                  <div key={todo.id} style={styles.todoItem}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      style={styles.checkbox}
                    />
                    <span style={{
                      ...styles.todoText,
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: todo.completed ? '#999' : '#333',
                      flex: 1
                    }}>
                      {todo.text}
                    </span>
                    <button onClick={() => deleteTodo(todo.id)} style={styles.deleteBtn}>删除</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 日程安排 */}
          {activeTab === 'schedule' && (
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3>日程安排</h3>
                <div>
                  <button style={styles.dateBtn}>◀ 昨天</button>
                  <span style={styles.currentDate}>2026-03-11</span>
                  <button style={styles.dateBtn}>明天 ▶</button>
                </div>
              </div>
              <div style={styles.fullScheduleList}>
                {schedules.map(schedule => (
                  <div key={schedule.id} style={styles.fullScheduleItem}>
                    <div style={{
                      ...styles.scheduleTime,
                      borderLeftColor: getScheduleTypeColor(schedule.type)
                    }}>
                      {schedule.time}
                    </div>
                    <div style={styles.scheduleTitle}>{schedule.title}</div>
                    <div style={{
                      ...styles.scheduleTag,
                      backgroundColor: getScheduleTypeColor(schedule.type) + '20',
                      color: getScheduleTypeColor(schedule.type)
                    }}>
                      {schedule.type === 'work' && '工作'}
                      {schedule.type === 'personal' && '个人'}
                      {schedule.type === 'important' && '重要'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 数据统计 */}
          {activeTab === 'stats' && (
            <div style={styles.statsSection}>
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <h3>任务完成情况</h3>
                </div>
                <div style={styles.progressContainer}>
                  <div style={styles.progressCircle}>
                    <div style={styles.progressValue}>67%</div>
                    <div style={styles.progressLabel}>完成率</div>
                  </div>
                  <div style={styles.progressDetails}>
                    <div style={styles.progressItem}>
                      <span>已完成</span>
                      <span style={styles.progressSuccess}>8</span>
                    </div>
                    <div style={styles.progressItem}>
                      <span>进行中</span>
                      <span style={styles.progressWarning}>4</span>
                    </div>
                    <div style={styles.progressItem}>
                      <span>总任务</span>
                      <span>12</span>
                    </div>
                  </div>
                </div>
              </div>
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <h3>周统计</h3>
                </div>
                <div style={styles.weekStats}>
                  {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((day, index) => (
                    <div key={day} style={styles.weekDay}>
                      <div style={styles.weekBar}>
                        <div style={{
                          ...styles.weekBarFill,
                          height: `${Math.random() * 100}%`,
                          backgroundColor: index < 5 ? '#1890ff' : '#52c41a'
                        }}></div>
                      </div>
                      <span>{day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 个人设置 */}
          {activeTab === 'settings' && (
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3>个人设置</h3>
              </div>
              <div style={styles.settingsForm}>
                <div style={styles.formGroup}>
                  <label>用户名</label>
                  <input type="text" defaultValue="张三" style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                  <label>邮箱</label>
                  <input type="email" defaultValue="zhangsan@example.com" style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                  <label>手机号</label>
                  <input type="tel" defaultValue="138****8888" style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                  <label>职位</label>
                  <input type="text" defaultValue="前端开发工程师" style={styles.input} />
                </div>
                <button style={styles.saveBtn}>保存修改</button>
                <Button type="primary">点击我</Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    width:'100vw',
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#001529',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
  },
  logo: {
    padding: '20px',
    borderBottom: '1px solid #ffffff20',
  },
  nav: {
    flex: 1,
    padding: '10px 0',
  },
  navItem: {
    padding: '14px 24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    transition: 'all 0.3s',
  },
  navItemActive: {
    backgroundColor: '#1890ff',
  },
  navIcon: {
    fontSize: '18px',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    height: '64px',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  headerTitle: {
    fontSize: '20px',
    fontWeight: '600',
    margin: 0,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  userInfo: {
    color: '#666',
  },
  logoutBtn: {
    padding: '6px 16px',
    backgroundColor: '#ff4d4f',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  content: {
    flex: 1,
    padding: '24px',
    overflow: 'auto',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginBottom: '24px',
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  statIcon: {
    fontSize: '32px',
    marginBottom: '12px',
  },
  statInfo: {
    marginBottom: '12px',
  },
  statValue: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: '14px',
    color: '#999',
  },
  statFooter: {
    paddingTop: '12px',
    borderTop: '1px solid #f0f0f0',
    fontSize: '13px',
  },
  statSuccess: {
    color: '#52c41a',
  },
  statWarning: {
    color: '#faad14',
  },
  statInfoText: {
    color: '#666',
  },
  sectionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  addBtn: {
    padding: '4px 12px',
    backgroundColor: '#1890ff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  todoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  todoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px',
    backgroundColor: '#fafafa',
    borderRadius: '4px',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  todoText: {
    fontSize: '14px',
    flex: 1,
  },
  deleteBtn: {
    padding: '4px 8px',
    backgroundColor: '#ff4d4f',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  scheduleList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  scheduleItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px',
    backgroundColor: '#fafafa',
    borderRadius: '4px',
  },
  scheduleTime: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#666',
    borderLeft: '3px solid',
    paddingLeft: '8px',
    minWidth: '50px',
  },
  scheduleTitle: {
    flex: 1,
    fontSize: '14px',
  },
  scheduleTag: {
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
  },
  addTask: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
  },
  addInput: {
    flex: 1,
    height: '40px',
    padding: '0 12px',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    fontSize: '14px',
  },
  addTaskBtn: {
    padding: '0 20px',
    height: '40px',
    backgroundColor: '#1890ff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  dateBtn: {
    padding: '4px 12px',
    backgroundColor: '#fff',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  currentDate: {
    margin: '0 12px',
    fontSize: '14px',
    fontWeight: '500',
  },
  fullScheduleList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  fullScheduleItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '16px',
    backgroundColor: '#fafafa',
    borderRadius: '8px',
  },
  statsSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
  },
  progressCircle: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: '#1890ff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  progressValue: {
    fontSize: '28px',
    fontWeight: 'bold',
  },
  progressLabel: {
    fontSize: '12px',
    opacity: 0.8,
  },
  progressDetails: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  progressItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
  },
  progressSuccess: {
    color: '#52c41a',
    fontWeight: '500',
  },
  progressWarning: {
    color: '#faad14',
    fontWeight: '500',
  },
  weekStats: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '200px',
    paddingTop: '20px',
  },
  weekDay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  weekBar: {
    width: '30px',
    height: '120px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'flex-end',
    overflow: 'hidden',
  },
  weekBarFill: {
    width: '100%',
    borderRadius: '4px',
    transition: 'height 0.3s',
  },
  settingsForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '400px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  input: {
    height: '40px',
    padding: '0 12px',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    fontSize: '14px',
  },
  saveBtn: {
    height: '40px',
    backgroundColor: '#1890ff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default PCHomePage;
