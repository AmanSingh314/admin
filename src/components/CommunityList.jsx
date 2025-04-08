import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const CommunityList = ({ communities, onDelete, onBlock ,type}) => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10; 

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = communities.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(communities.length / usersPerPage);
  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-2xl shadow-2xl border border-gray-700 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
      <h2 className="text-3xl font-bold mb-6 text-gray-200 tracking-wide">Community List</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-900 rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white">
            <tr>
              <th className="py-4 px-6 text-left text-lg">Community ID</th>
              <th className="py-4 px-6 text-left text-lg">Name</th>
              <th className="py-4 px-6 text-left text-lg">Members</th>
              <th className="py-4 px-6 text-left text-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((community, index) => (
              <tr
                key={community.id}
                className={`border-b border-gray-700 transition duration-500 transform hover:scale-90 hover:shadow-lg ${
                  index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                } hover:bg-indigo-600/20`}
              >
                <td className="py-4 px-6 text-gray-300 font-medium transition-all duration-300">
                <Link to={`/${type}/${community.id}`} className="text-blue-500 hover:underline"> {community.id}</Link>
                </td>
                <td className="py-4 px-6 font-semibold text-lg text-gray-200 hover:text-purple-800 transition duration-300">
                  {community.name}
                </td>
                <td className="py-4 px-6 text-center text-gray-400 text-lg">
                  {community.members}
                </td>
                <td className="py-4 px-6 flex gap-3">
                  <button
                    onClick={() => onBlock(community.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl transition-transform duration-300 transform hover:scale-110 shadow-md hover:shadow-xl"
                  >
                    Block
                  </button>
                  <button
                    onClick={() => onDelete(community.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition-transform duration-300 transform hover:scale-110 shadow-md hover:shadow-xl"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}

        <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? " cursor-not-allowed" : " "
          } transition duration-300`}
        >
          {"<<<"}
        </button>
        <span className="text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages ? " cursor-not-allowed" : " "
          } transition duration-300`}
        >
          {">>>"}
        </button>
      </div>
      </div>
    </div>
  );
};

export default CommunityList;
