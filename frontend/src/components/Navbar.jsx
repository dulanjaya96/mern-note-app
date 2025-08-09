import React from 'react'
import { Link } from 'react-router'
import { PlusIcon, Sun, Moon } from 'lucide-react'

const Navbar = ({ user, setUser, toggleTheme, theme }) => {

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Remove token
    setUser(null); // Clear user state
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            NoteApp
          </h1>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-sm font-medium text-base-content">
                Welcome, {user.name}
              </span>
            )}
            <Link to="/create" className="btn btn-primary ">
              <PlusIcon className="size-5" />
              <span>Create Note</span>
            </Link>
            {user ? (              
                <button
                onClick={handleLogout}
                className="btn btn-secondary min-w-[90px]" // ✅ consistent size
                >
                Logout
                </button>             
            ) : (
              <>
                <Link to="/login" className="btn btn-primary min-w-[90px]">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-secondary min-w-[90px]">
                  Signup
                </Link>
              </>
            )}

            {/* Theme Toggle Button with Icons */}
            <button
              onClick={toggleTheme}
              type="button"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              className="btn btn-ghost btn-circle hover:bg-base-200 transition-all duration-200"
            >
              {theme === 'light' ? (
                <Moon className="size-5 text-base-content" />
              ) : (
                <Sun className="size-5 text-base-content" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
