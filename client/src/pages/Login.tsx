import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../api/authApi';
import { setCredentials } from '../features/auth/authSlice';
import toast from 'react-hot-toast';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser(formData);

      dispatch(
        setCredentials({
          user: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
      );
      toast.success('Login Successful');
      console.log('data', data);
      if (data.user.role == 'user') {
        navigate('/dashboard');
      } else {
        navigate('/admin/subscriptions');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 ">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-300 p-6 rounded-2xl shadow-md w-100">
        <h1 className="text-3xl font-bold mb-5 text-center ">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 dark:border-gray-500 p-3 rounded-lg mb-4 outline-none "
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 dark:border-gray-500 p-3 rounded-lg mb-4 outline-none"
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
        />

        <button
          className={`p-3 w-full  rounded-lg  text-white transition duration-300 ${loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-black hover:bg-gray-800 cursor-pointer'}`}
          disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>

        <p className="mt-4 text-center">
          Don't have account?{' '}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
