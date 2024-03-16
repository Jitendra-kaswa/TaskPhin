import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import MainContent from './components/mainRoutes/Dashboard';
import Reports from './components/mainRoutes/Reports';
import Settings from './components/mainRoutes/Settings';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="w-full">
      <div className="flex flex-row bg-gray-100">
        <Sidebar />
        <Routes>
          <Route path="/dashboard" element={<MainContent />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<MainContent />} />
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
