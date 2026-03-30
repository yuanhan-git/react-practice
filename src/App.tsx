import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HomePage from '@/pages/home';
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from '@/router';

function App() {
  return (
    <Router>
      {/* <Nav /> 导航栏 */}
      <main>
        <HomePage />
        {/* <AppRoutes /> 路由出口 */}
      </main>
    </Router>
  )
}

export default App
