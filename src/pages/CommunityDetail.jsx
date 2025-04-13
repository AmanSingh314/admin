import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeedDetail = () => {
  const { feedId } = useParams(); 

  const feed = {
    id: feedId,
    content: 'This is a sample feed content.',
    likes: 10,
    comments: 5,
    shares: 2,
    bookmarks: 3,
    status: 'Active',
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-blue-900 p-6 rounded-lg">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-blue-950/70 backdrop-blur-xl p-12 rounded-3xl shadow-2xl w-full max-w-2xl text-white border border-white/20 relative"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-300">Feed Details</h1>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4 text-lg"
        >
          <div className="flex justify-between tracking-widest text-blue-200"><strong className="font-semibold">ID:</strong> <span>{feed.id}</span></div>
          <div className="flex justify-between tracking-widest text-blue-200"><strong className="font-semibold">Content:</strong> <span>{feed.content}</span></div>
          <div className="flex justify-between tracking-widest text-blue-200"><strong className="font-semibold">Likes:</strong> <span>{feed.likes}</span></div>
          <div className="flex justify-between tracking-widest text-blue-200"><strong className="font-semibold">Comments:</strong> <span>{feed.comments}</span></div>
          <div className="flex justify-between tracking-widest text-blue-200"><strong className="font-semibold">Shares:</strong> <span>{feed.shares}</span></div>
          <div className="flex justify-between tracking-widest text-blue-200"><strong className="font-semibold">Bookmarks:</strong> <span>{feed.bookmarks}</span></div>
          <div className="flex justify-between tracking-widest text-blue-200">
            <strong className="font-semibold">Status:</strong>
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className={`ml-3 px-5 py-2 rounded-full text-lg font-bold shadow-lg tracking-wide 
                ${feed.status === "Active" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
            >
              {feed.status}
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeedDetail;
