// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Sidebar from "./components/Sidebar";
// import Navbar from "./components/Navbar";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Users from "./pages/Users";
// import Feeds from "./pages/Feeds";
// import Communities from "./pages/Communities";
// import FeedDetail from "./pages/FeedDetail";
// import CommunityDetail from "./pages/CommunityDetail";
// import UserDetail from "./pages/UserDetail";
// import SplashScreen from "./components/SplashScreen";
// import ToastContainer  from "react-hot-toast";

// const App = () => {
//   const { isAuthenticated } = useSelector((state) => state.auth);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isLoading, setIsLoading] = useState(true);

//   // Simulate loading delay (e.g., fetching initial data)
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 2000); // 2 seconds delay for splash screen
//     return () => clearTimeout(timer);
//   }, []);

//   // Mock notifications data
//   const notificationsData = [
//     { id: 1, message: "New user signed up" },
//     { id: 2, message: "Post reported for review" },
//   ];

//   // Show splash screen while loading
//   if (isLoading) {
//     return <SplashScreen setIsLoading={setIsLoading} />;
//   }

//   return (
//     <Router>
//       {/* Toast container for notifications */}
//       <ToastContainer position="top-right" />

//       {isAuthenticated ? (
//         <div className="flex">
//           {/* Sidebar with toggle functionality */}
//           <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

//           {/* Main content area */}
//           <div
//             className={`flex-1 transition-all duration-300 ${
//               isSidebarOpen ? "ml-64" : "ml-20"
//             }`}
//           >
//             {/* Navbar with notifications */}
//             <Navbar isOpen={isSidebarOpen} notifications={notificationsData} />

//             {/* Page content */}
//             <div className="p-6 mt-28">
//               <Routes>
//                 <Route path="/dashboard" element={<Dashboard />} />
//                 <Route path="/users" element={<Users />} />
//                 <Route path="/feeds" element={<Feeds />} />
//                 <Route path="/communities" element={<Communities />} />
//                 <Route path="/user/:userId" element={<UserDetail />} />
//                 <Route path="/feed/:feedId" element={<FeedDetail />} />
//                 <Route path="/community/:communityId" element={<CommunityDetail />} />
//                 <Route path="*" element={<Navigate to="/dashboard" />} />
//               </Routes>
//             </div>
//           </div>
//         </div>
//       ) : (
//         // Unauthenticated routes
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//       )}
//     </Router>
//   );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Feeds from './pages/Feeds';
import Communities from './pages/Communities';
import FeedDetail from './pages/FeedDetail';
import CommunityDetail from './pages/CommunityDetail';
import UserDetail from './pages/UserDetail';
import SplashScreen from './components/SplashScreen';
import AuthGuard from './components/AuthGuard';

const App = () => {
  const { user } = useSelector((state) => state.auth); // Check for user object
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay (e.g., fetching initial data)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds delay for splash screen
    return () => clearTimeout(timer);
  }, []);

  
  if (isLoading) {
    return <SplashScreen setIsLoading={setIsLoading} />;
  }

  return (
    <Router>
     
      <Toaster position="top-right" />

      {user ? ( 
        <div className="flex">
       
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

         
          <div
            className={`flex-1 transition-all duration-300 ${
              isSidebarOpen ? 'ml-64' : 'ml-20'
            }`}
          >
            
            <Navbar isOpen={isSidebarOpen} />

           
            <div className="p-6 mt-28">
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    <AuthGuard>
                      <Dashboard />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <AuthGuard>
                      <Users />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/feeds"
                  element={
                    <AuthGuard>
                      <Feeds />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/communities"
                  element={
                    <AuthGuard>
                      <Communities />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/user/:code"
                  element={
                    <AuthGuard>
                      <UserDetail />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/feed/:feedId"
                  element={
                    <AuthGuard>
                      <FeedDetail />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/community/:communityId"
                  element={
                    <AuthGuard>
                      <CommunityDetail />
                    </AuthGuard>
                  }
                />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
       
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;