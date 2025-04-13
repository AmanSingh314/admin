// import React, { useEffect } from "react";

// import { Link } from "react-router-dom";


// const Dashboard = () => {
 
//   return (
//     <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen rounded-3xl">
//       <h1 className="text-4xl font-extrabold mb-8 text-gray-100 animate-fade-in">Dashboard</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//         {[
//           { title: "Total Users", count: '4533', link: "/users", color: "from-purple-500 to-purple-700" },
//           { title: "Total Feeds", count: '3033', link: "/feeds", color: "from-blue-500 to-blue-700" },
//           { title: "Total Communities", count: "89", link: "/communities", color: "from-green-500 to-green-700" },
//         ].map((item, index) => (
//           <div
//             key={index}
//             className={`p-6 rounded-lg shadow-xl bg-gradient-to-br ${item.color} transition-transform transform hover:scale-105 duration-300 ease-in-out 
//             backdrop-blur-lg bg-opacity-30 border border-white/20 relative overflow-hidden`}
//           >
            
//             <div className="absolute inset-0 bg-white opacity-10 blur-2xl"></div>

//             <h2 className="text-xl font-semibold text-white relative z-10">{item.title}</h2>
//             <p className="text-4xl font-bold mt-2 mb-4 text-gray-200 relative z-10">{item.count}</p>
//             <Link
//               to={item.link}
//               className="relative z-10 text-white bg-black bg-opacity-30 px-4 py-2 rounded-lg hover:bg-opacity-50 transition-all duration-300"
//             >
//               Manage {item.title.split(" ")[1]}
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;























import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import { FiUsers, FiFeather, FiGlobe, FiActivity, FiArrowRight } from "react-icons/fi";

const Dashboard = () => {
  const { scrollYProgress } = useViewportScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const [activeCard, setActiveCard] = useState(null);

  // Card data with growth indicators
  const cards = [
    { 
      title: "User Network", 
      count: '4,533', 
      growth: '+12%', 
      link: "/users", 
      icon: <FiUsers className="text-3xl" />,
      color: "rgba(168, 85, 247, 0.15)",
      border: "rgba(168, 85, 247, 0.5)"
    },
    { 
      title: "Content Stream", 
      count: '3,033', 
      growth: '+8%', 
      link: "/feeds", 
      icon: <FiFeather className="text-3xl" />,
      color: "rgba(59, 130, 246, 0.15)",
      border: "rgba(59, 130, 246, 0.5)"
    },
    { 
      title: "Community Hubs", 
      count: "89", 
      growth: '+23%', 
      link: "/communities", 
      icon: <FiGlobe className="text-3xl" />,
      color: "rgba(16, 185, 129, 0.15)",
      border: "rgba(16, 185, 129, 0.5)"
    },
  ];

  // Activity data
  const activities = [
    { type: "user", action: "New signup", who: "Sarah Johnson", time: "2 mins ago" },
    { type: "feed", action: "Post trending", what: "Tech innovations", time: "15 mins ago" },
    { type: "community", action: "Event created", what: "Design meetup", time: "1 hour ago" }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6"
      style={{ y: yPos }}
    >
      <div className="max-w-7xl mx-auto">
    
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex justify-between items-center"
        >
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            Dashboard
            </h1>
            <p className="text-gray-400 mt-2">Real-time platform analytics</p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="hidden md:block"
          >
            <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <span className="text-xl">👋</span>
            </div>
          </motion.div>
        </motion.header>

        {/* Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 relative">
          {/* Floating orb decoration */}
          <motion.div 
            animate={{
              x: [0, 20, 0],
              y: [0, 15, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"
          />
          
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, type: "spring" }}
              whileHover={{ 
                y: -10,
                boxShadow: `0 25px 50px -12px ${card.border}`
              }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setActiveCard(index)}
              onHoverEnd={() => setActiveCard(null)}
              style={{
                backgroundColor: card.color,
                border: `1px solid ${card.border}`,
                transformStyle: 'preserve-3d',
                transform: activeCard === index ? 'perspective(1000px) rotateX(5deg)' : 'perspective(1000px) rotateX(0deg)'
              }}
              className="rounded-2xl p-6 backdrop-blur-lg transition-all duration-300 ease-out cursor-pointer h-full"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="p-3 rounded-lg bg-white/10 w-max mb-4">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{card.title}</h3>
                  <p className="text-gray-300 text-sm">Last 30 days</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-white/10">
                  {card.growth}
                </span>
              </div>
              
              <div className="mt-8 flex justify-between items-end">
                <p className="text-4xl font-bold">{card.count}</p>
                <Link 
                  to={card.link}
                  className="flex items-center text-sm group"
                >
                  Explore
                  <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Animated bar chart */}
              <div className="mt-6 h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${70 + (index * 10)}%` }}
                  transition={{ delay: 0.5 + (index * 0.1), duration: 1 }}
                  style={{ backgroundColor: card.border }}
                  className="h-full rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Activity Feed */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <FiActivity className="text-xl mr-3 text-cyan-400" />
              <h2 className="text-2xl font-bold">Live Activity</h2>
            </div>
            <motion.div
              whileHover={{ x: 3 }}
              className="text-sm text-cyan-400 flex items-center cursor-pointer"
            >
              View all <FiArrowRight className="ml-1" />
            </motion.div>
          </div>
          
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + (index * 0.1) }}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                className="p-4 rounded-xl flex items-start hover:bg-white/5 transition-colors"
              >
                <div className={`p-2 rounded-lg mr-4 ${
                  activity.type === 'user' ? 'bg-purple-500/20' : 
                  activity.type === 'feed' ? 'bg-blue-500/20' : 'bg-green-500/20'
                }`}>
                  {activity.type === 'user' ? <FiUsers /> : 
                   activity.type === 'feed' ? <FiFeather /> : <FiGlobe />}
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    <span className="text-cyan-400">{activity.action}</span> •{' '}
                    {activity.who || activity.what}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">{activity.time}</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Mini Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Engagement Rate", value: "78%", trend: "up" },
            { label: "Avg. Session", value: "4.2m", trend: "up" },
            { label: "New Visits", value: "1.2k", trend: "down" },
            { label: "Bounce Rate", value: "34%", trend: "down" },
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center"
            >
              <div className={`w-3 h-3 rounded-full mr-3 ${
                stat.trend === 'up' ? 'bg-green-400' : 'bg-red-400'
              }`} />
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="font-semibold">{stat.value}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;




















