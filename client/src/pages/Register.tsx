import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authApi';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(formData);

      toast.success('Registration Successful');

      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 flex justify-center items-center">
      <div className="bg-white  dark:bg-gray-300  p-8 rounded-2xl w-full max-w-md mx-auto shadow-sm">
        <h1 className="font-bold text-3xl text-center mb-6">Create account</h1>

        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div>
            <label className="block mb-2 font-medium" htmlFor="name">
              Full Name
            </label>

            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="w-full focus:outline-none p-3 border border-gray-300 dark:border-gray-500  rounded-lg"
              placeholder="Username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>

            <input
              className="border border-gray-300 dark:border-gray-500 w-full p-3 rounded-lg focus:outline-none "
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              placeholder="********"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>

            <input
              className="border border-gray-300 dark:border-gray-500 w-full p-3 rounded-lg focus:outline-none "
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              placeholder="abc@domain.com"
            />
          </div>

          <button
            className={`p-3 w-full rounded-lg  text-white transition duration-300 ${loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-800 cursor-pointer'}`}
            disabled={loading}>
            {loading ? 'Loading...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-4">
          Already have an account?
          <Link to="/login" className="ml-1 text-blue-700 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
