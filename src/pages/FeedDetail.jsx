import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchFeedDetail } from '../features/feeds/feedDetailSlice';
import { motion } from 'framer-motion';

const FeedDetail = () => {
  const dispatch = useDispatch();
  const { feedId } = useParams(); 
  
  const feedDetailState = useSelector((state) => state.feedDetail || {});
  const { feed, loading, error } = feedDetailState;

  useEffect(() => {
    if (feedId) {
      dispatch(fetchFeedDetail(feedId));
    }
  }, [dispatch, feedId]);

  
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

  const statusVariants = {
    active: { 
      scale: [1, 1.05, 1],
      transition: { 
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse"
      }
    },
    inactive: { 
      backgroundColor: "#ef4444" 
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
            ⏳
          </motion.div>
          <p className="text-gray-300 text-xl">Loading feed details...</p>
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

  if (!feed) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-10"
      >
        <p className="text-gray-300 text-xl">No feed data found.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen rounded-lg"
    >
      <motion.div 
        variants={itemVariants}
        className="max-w-4xl mx-auto"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
        >
          Feed Details
        </motion.h1>
        
        <motion.div 
          variants={itemVariants}
          className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 overflow-hidden"
        >
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 mb-6 transform origin-left"
          />
          
          <motion.div 
            variants={containerVariants}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <p className="text-gray-400 font-medium">Feed ID:</p>
                <p className="text-white text-lg mt-1">{feed.feed_id}</p>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <p className="text-gray-400 font-medium">Status:</p>
                <motion.span 
                  variants={statusVariants}
                  animate={feed.status === 'Active' ? 'active' : 'inactive'}
                  className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mt-1 ${
                    feed.status === 'Active' ? 'bg-green-600' : 'bg-red-600'
                  }`}
                >
                  {feed.status}
                </motion.span>
              </motion.div>
              
              <motion.div variants={itemVariants} className="md:col-span-2">
                <p className="text-gray-400 font-medium">Visibility:</p>
                <p className="text-white text-lg mt-1 whitespace-pre-line">{feed.visibility}</p>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="md:col-span-2 bg-gray-700 p-4 rounded-lg"
              >
                <p className="text-gray-400 font-medium">Content:</p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-white text-lg mt-1 whitespace-pre-line"
                >
                  {feed.content}
                </motion.p>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <p className="text-gray-400 font-medium">Total Likes:</p>
                <div className="flex items-center mt-1">
                  <motion.span 
                    whileHover={{ scale: 1.1 }}
                    className="text-white text-lg mr-2"
                  >
                    {feed.total_like || 0}
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
                <p className="text-gray-400 font-medium">Total Comments:</p>
                <div className="flex items-center mt-1">
                  <motion.span 
                    whileHover={{ scale: 1.1 }}
                    className="text-white text-lg mr-2"
                  >
                    {feed.total_comment || 0}
                  </motion.span>
                  <motion.span 
                    whileTap={{ scale: 0.9 }}
                    className="text-blue-400 text-xl"
                  >
                    💬
                  </motion.span>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <p className="text-gray-400 font-medium">Shares:</p>
                <div className="flex items-center mt-1">
                  <motion.span 
                    whileHover={{ scale: 1.1 }}
                    className="text-white text-lg mr-2"
                  >
                    {feed.shares || 0}
                  </motion.span>
                  <motion.span 
                    whileTap={{ scale: 0.9 }}
                    className="text-green-400 text-xl"
                  >
                    ↗️
                  </motion.span>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <p className="text-gray-400 font-medium">Bookmarks:</p>
                <div className="flex items-center mt-1">
                  <motion.span 
                    whileHover={{ scale: 1.1 }}
                    className="text-white text-lg mr-2"
                  >
                    {feed.bookmarks || 0}
                  </motion.span>
                  <motion.span 
                    whileTap={{ scale: 0.9 }}
                    className="text-yellow-400 text-xl"
                  >
                    🔖
                  </motion.span>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <p className="text-gray-400 font-medium">Created At:</p>
                <p className="text-white text-lg mt-1">
                  {new Date(feed.create_date).toLocaleString()}
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <p className="text-gray-400 font-medium">Updated At:</p>
                <p className="text-white text-lg mt-1">
                  {new Date(feed.modify_date).toLocaleString()}
                </p>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-purple-600 to-blue-500 mt-6 transform origin-right"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FeedDetail;