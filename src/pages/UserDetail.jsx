import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserDetail } from '../features/users/userDetailSlice';
import { motion } from 'framer-motion';

const UserDetail = () => {
  const dispatch = useDispatch();
  const { code } = useParams(); 
  const { user, loading, error } = useSelector((state) => state.userDetail);

  useEffect(() => {
    dispatch(fetchUserDetail(code));
  }, [dispatch, code]);

  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const profileVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    }
  };

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-64"
      >
        <div className="text-center">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
            className="inline-block text-4xl mb-4"
          >
            👤
          </motion.div>
          <p className="text-gray-300 text-xl">Loading user profile...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-10"
      >
        <motion.div 
          animate={{ 
            x: [-5, 5, -5],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "mirror"
          }}
          className="text-red-500 text-4xl mb-4"
        >
          ⚠️
        </motion.div>
        <p className="text-red-500 text-xl">Error: {error}</p>
      </motion.div>
    );
  }

  if (!user) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-10"
      >
        <p className="text-gray-300 text-xl">No user data found.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen"
    >
      <motion.div 
        variants={itemVariants}
        className="max-w-4xl mx-auto"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
        >
          User Profile
        </motion.h1>
        
        <motion.div 
          variants={itemVariants}
          className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 overflow-hidden"
        >
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            className="h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mb-6 transform origin-left"
          />
          
          <motion.div 
            variants={containerVariants}
            className="space-y-6"
          >
            
            <motion.div 
              variants={profileVariants}
              className="flex flex-col items-center mb-6"
            >
              {user.resultSet.profile_image ? (
                <motion.img
                  src={user.resultSet.profile_image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                />
              ) : (
                <motion.div
                  className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-4xl border-4 border-blue-500 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  👤
                </motion.div>
              )}
              <motion.h2 
                className="text-2xl font-bold mt-4 text-center"
                variants={itemVariants}
              >
                {user.resultSet.user_name}
              </motion.h2>
              <motion.p 
                className="text-blue-400 text-lg"
                variants={itemVariants}
              >
                @{user.resultSet.user_handle}
              </motion.p>
            </motion.div>

           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <p className="text-gray-400 font-medium">Email:</p>
                <p className="text-white text-lg mt-1">{user.resultSet.email}</p>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <p className="text-gray-400 font-medium">User Type:</p>
                <motion.span 
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-1 ${
                    user.resultSet.user_type === 'Admin' 
                      ? 'bg-purple-600' 
                      : user.resultSet.user_type === 'Premium'
                        ? 'bg-yellow-600'
                        : 'bg-blue-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {user.resultSet.user_type}
                </motion.span>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <p className="text-gray-400 font-medium">Followers:</p>
                <div className="flex items-center mt-1">
                  <motion.span 
                    whileHover={{ scale: 1.1 }}
                    className="text-white text-lg mr-2"
                  >
                    {user.resultSet.total_follower || 0}
                  </motion.span>
                  <motion.span 
                    whileTap={{ scale: 0.9 }}
                    className="text-red-400 text-xl"
                  >
                    ❤️
                  </motion.span>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <p className="text-gray-400 font-medium">Following:</p>
                <div className="flex items-center mt-1">
                  <motion.span 
                    whileHover={{ scale: 1.1 }}
                    className="text-white text-lg mr-2"
                  >
                    {user.resultSet.total_following || 0}
                  </motion.span>
                  <motion.span 
                    whileTap={{ scale: 0.9 }}
                    className="text-blue-400 text-xl"
                  >
                    👥
                  </motion.span>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mt-6 transform origin-right"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default UserDetail;