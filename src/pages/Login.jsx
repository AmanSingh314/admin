import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if (result.payload?.user) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-800 to-pink-600 relative overflow-hidden">
      
      {[...Array(10)].map((_, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, scale: 0.5, rotate: Math.random() * 360 }}
          animate={{ opacity: 0.4, scale: Math.random() * 2, rotate: Math.random() * 720 }}
          transition={{ duration: Math.random() * 10 + 5, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${Math.floor(Math.random() * 100) + 50}px`,
            height: `${Math.floor(Math.random() * 100) + 50}px`,
            background: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.3)`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
      
      <div className="flex bg-white rounded-lg shadow-2xl overflow-hidden w-[800px] relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }}
          className="w-1/2 bg-gradient-to-r from-purple-700 to-blue-500 p-10 flex flex-col justify-center text-white"
        >
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="mt-2">Sign in to continue access</p>
          <p className="mt-auto text-sm">www.mhindu.com</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }}
          className="w-1/2 p-10"
        >
          <h2 className="text-2xl font-semibold text-gray-700 text-center">Sign In</h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all hover:shadow-md"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all hover:shadow-md"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md font-bold hover:opacity-90 shadow-lg transition-all hover:shadow-xl"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Continue'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
