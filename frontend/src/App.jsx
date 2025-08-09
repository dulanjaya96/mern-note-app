// App.jsx
import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import CreatePage from './pages/CreatePage.jsx'
import NoteDetailPage from './pages/NoteDetailPage.jsx'
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import api from './lib/axios.js';
import toast from 'react-hot-toast'

const App = () => {
  const [theme, setTheme] = useState('light')
  const [user, setUser] = useState(null);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)    
  }

  useEffect(() => {
    const token = localStorage.getItem('userToken');

    // If token exists, fetch user profile
    if (token) {
      api
        .get('/users/profile')
        .then((res) => {
          setUser(res.data); // Set user data
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
          localStorage.removeItem('userToken'); // Remove invalid token
          setUser(null); // Clear user state
        });
    }
  }, []);

  return (
    <div data-theme={theme} className="min-h-screen transition-colors">
      <Routes>
        <Route
          path="/"
          element={<HomePage toggleTheme={toggleTheme} user={user} setUser={setUser} />}
        />
        <Route path="/create" element={<CreatePage user={user} />} />
        <Route path="/note/:id" element={<NoteDetailPage user={user} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
      </Routes>
    </div>
  )
}

export default App

