import React, { useEffect } from "react";
import { motion } from "framer-motion";

const SplashScreen = ({ setIsLoading }) => {
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3500); 
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 2.7 }}
      className="flex flex-col justify-center items-center h-screen w-full bg-gradient-to-br from-black to-purple-900 relative overflow-hidden"
    >
     
      <motion.div
        initial={{ rotate: 0, scale: 0.8 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-white text-3xl font-bold"
        >
          M
        </motion.span>
      </motion.div>

      
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="text-white text-3xl font-bold mt-6"
      >
        Mhindu Admin Panel
      </motion.h1>

     
      <div className="flex mt-4">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0.3, y: 0 }}
            animate={{ opacity: 1, y: -5 }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.2,
            }}
            className="w-3 h-3 bg-white rounded-full mx-1"
          ></motion.span>
        ))}
      </div>

     
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 3, opacity: 0.3 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        className="absolute w-48 h-48 bg-purple-400 opacity-20 rounded-full blur-2xl top-20 left-20"
      ></motion.div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 2, opacity: 0.2 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", delay: 1 }}
        className="absolute w-56 h-56 bg-pink-400 opacity-20 rounded-full blur-2xl bottom-16 right-16"
      ></motion.div>
    </motion.div>
  );
};

export default SplashScreen;
