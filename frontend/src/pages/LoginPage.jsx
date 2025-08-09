import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import toast from 'react-hot-toast';
import api from '../lib/axios.js';

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error('All fields are required');
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.post('/users/login', { email, password });
      localStorage.setItem('userToken', data.token); // Save the token
      setUser(data); // Update user state
      toast.success('Login successful!');
      navigate('/'); // Redirect to the homepage
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card bg-base-100 max-w-md w-full shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-2xl">Log In</h2>
          <form onSubmit={handleLogin}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
          <p className="text-sm text-center mt-4">
            Don't have an account? <Link to="/signup" className="link">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;