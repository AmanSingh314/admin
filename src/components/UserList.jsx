import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers, deleteUsers, blockUsers } from "../features/users/userSlice";
import { toast } from "react-hot-toast";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error, pagination } = useSelector((state) => state.users);

  const [selected, setSelected] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const usersPerPage = 10;

  useEffect(() => {
    dispatch(
      fetchUsers({
        record_per_page: usersPerPage,
        page_number: currentPage,
        fromDate: fromDate || null,
        toDate: toDate || null,
        sort: "asc",
      })
    );
  }, [dispatch, currentPage, fromDate, toDate]);

  const handleSelectAll = (e) => {
    setSelected(e.target.checked ? users.map((user) => user.user_code) : []);
  };

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDelete = (ids) => {
    dispatch(deleteUsers(ids))
      .unwrap()
      .then(() => {
        toast.success("Users deleted successfully!");
        setSelected([]);
      })
      .catch(() => toast.error("Failed to delete users."));
  };

  const handleBlock = (ids) => {
    dispatch(blockUsers(ids))
      .unwrap()
      .then(() => {
        toast.success("Users blocked successfully!");
        setSelected([]);
      })
      .catch(() => toast.error("Failed to block users."));
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl shadow-xl md:p-2">
      <h2 className="text-2xl font-bold mb-4 text-gray-100">User List</h2>

      {/* Date Filters + Refresh Button */}
      <div className="flex flex-wrap items-end gap-4 mb-4">
        <div>
          <label className="block text-gray-300 mb-1">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-1">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded"
          />
        </div>
        <button
          onClick={() => {
            setCurrentPage(1);
            setFromDate("");
            setToDate("");
            dispatch(
              fetchUsers({
                record_per_page: usersPerPage,
                page_number: 1,
                fromDate: null,
                toDate: null,
                sort: "asc",
              })
            );
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded mt-1"
        >
          Refresh
        </button>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-900 rounded-lg shadow-md overflow-hidden text-sm md:text-base">
          <thead className="bg-gray-700">
            <tr className="text-left text-white">
              <th className="py-3 px-4">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  className="w-5 h-5 cursor-pointer accent-purple-500"
                  checked={selected.length === users.length && users.length > 0}
                />
              </th>
              <th className="py-3 px-4">User Handle</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">User Type</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_code} className="border-b border-gray-700 hover:bg-gray-800 transition">
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selected.includes(user.user_code)}
                    onChange={() => handleSelect(user.user_code)}
                    className="w-5 h-5 cursor-pointer accent-purple-500"
                  />
                </td>
                <td className="py-3 px-4">
                  <Link to={`/user/${user.user_code}`} className="text-blue-500 hover:underline">
                    {user.user_handle}
                  </Link>
                </td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.user_type}</td>
                <td className="py-3 px-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleBlock([user.user_code])}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                  >
                    Block
                  </button>
                  <button
                    onClick={() => handleDelete([user.user_code])}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"}`}
        >
          {"<<"}
        </button>
        <span className="text-gray-300">
          Page {currentPage} of {Math.ceil(pagination.totalRecords / usersPerPage)}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(pagination.totalRecords / usersPerPage))
            )
          }
          disabled={currentPage === Math.ceil(pagination.totalRecords / usersPerPage)}
          className={`px-4 py-2 rounded ${
            currentPage === Math.ceil(pagination.totalRecords / usersPerPage)
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-700"
          }`}
        >
          {">>"}
        </button>
      </div>

      {/* Bulk Actions */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => handleDelete(selected)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
        >
          Delete Selected
        </button>
        <button
          onClick={() => handleBlock(selected)}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded"
        >
          Block Selected
        </button>
      </div>
    </div>
  );
};

export default UserList;
