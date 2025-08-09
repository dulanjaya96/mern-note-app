import React from 'react'
import { Link } from 'react-router'
import { PlusIcon } from 'lucide-react'

const Navbar = ({ user, setUser, toggleTheme }) => {

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
            <Link to="/create" className="btn btn-primary ">
              <PlusIcon className="size-5" />
              <span>Create Note</span>
            </Link>
            {user ? (
              <>
                <span>Welcome, {user.name}</span>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-secondary">
                  Signup
                </Link>
              </>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              type="button"
              title="Toggle theme"
              aria-label="Toggle theme"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 32 32"
                className="text-base-content"
              >
                <clipPath id="theme-toggle__cutout">
                  <path d="M0-11h25a1 1 0 0017 13v30H0Z" />
                </clipPath>
                <g clipPath="url(#theme-toggle__cutout)">
                  <circle cx="16" cy="16" r="8.4" />
                  <path d="M18.3 3.2c0 1.3-1 2.3-2.3 2.3s-2.3-1-2.3-2.3S14.7.9 16 .9s2.3 1 2.3 2.3zm-4.6 25.6c0-1.3 1-2.3 2.3-2.3s2.3 1 2.3 2.3-1 2.3-2.3 2.3-2.3-1-2.3-2.3zm15.1-10.5c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zM3.2 13.7c1.3 0 2.3 1 2.3 2.3s-1 2.3-2.3 2.3S.9 17.3.9 16s1-2.3 2.3-2.3zm5.8-7C9 7.9 7.9 9 6.7 9S4.4 8 4.4 6.7s1-2.3 2.3-2.3S9 5.4 9 6.7zm16.3 21c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zm2.4-21c0 1.3-1 2.3-2.3 2.3S23 7.9 23 6.7s1-2.3 2.3-2.3 2.4 1 2.4 2.3zM6.7 23C8 23 9 24 9 25.3s-1 2.3-2.3 2.3-2.3-1-2.3-2.3 1-2.3 2.3-2.3z" />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
