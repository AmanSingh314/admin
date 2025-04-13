import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  blockCommunity, 
  
  fetchCommunities,
  deleteCommunity,
  setCurrentPage,
  setRecordPerPage
} from "../features/communities/communitiesSlice";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const CommunityList = () => {
  const dispatch = useDispatch();
  const { 
    communities, 
    loading, 
    error, 
    pagination: { currentPage, recordPerPage, totalRecords } 
  } = useSelector((state) => state.communities);
  
  const [selected, setSelected] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    dispatch(
      fetchCommunities({
        record_per_page: recordPerPage,
        page_number: currentPage,
        fromDate: fromDate || null,
        toDate: toDate || null,
        sort: "asc",
      })
    );
  }, [dispatch, currentPage, recordPerPage, fromDate, toDate]);

  const handleSelectAll = (e) => {
    setSelected(e.target.checked ? communities.map((c) => c.community_id) : []);
  };

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDelete = async (ids) => {
    try {
      const deletePromises = ids.map(id => dispatch(deleteCommunity(id)));
      await Promise.all(deletePromises);
      toast.success("Communities deleted successfully!");
      setSelected([]);
    } catch (err) {
      toast.error("Failed to delete one or more communities.");
      console.error("❌ Bulk delete error:", err);
    }
  };

  const handleBlock = async (ids) => {
    try {
      const blockPromises = ids.map(id => dispatch(blockCommunity(id)));
      await Promise.all(blockPromises);
      toast.success("Communities blocked successfully!");
      setSelected([]);
    } catch (err) {
      toast.error("Failed to block one or more communities.");
      console.error("❌ Bulk block error:", err);
    }
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleRecordsPerPageChange = (e) => {
    dispatch(setRecordPerPage(Number(e.target.value)));
    dispatch(setCurrentPage(1));
  };

  if (loading) return <div className="text-center py-8">Loading communities...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;


  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-100">Community List</h2>

      {/* Filters */}
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
        <div>
          <label className="block text-gray-300 mb-1">Records per page</label>
          <select
            value={recordPerPage}
            onChange={handleRecordsPerPageChange}
            className="bg-gray-800 text-white p-2 rounded"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <button
          onClick={() => {
            dispatch(setCurrentPage(1));
            setFromDate("");
            setToDate("");
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        >
          Refresh
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-900 rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gray-700">
            <tr className="text-left text-white">
              <th className="py-3 px-4">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selected.length === communities.length && communities.length > 0}
                  className="w-5 h-5 cursor-pointer accent-purple-500"
                />
              </th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Creator</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>{console.log('communities',communities)}
            {communities.map((c) => (
              <tr key={c.community_id} className="border-b border-gray-700 hover:bg-gray-800 transition">
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selected.includes(c.community_id)}
                    onChange={() => handleSelect(c.community_id)}
                    className="w-5 h-5 cursor-pointer accent-purple-500"
                  />
                </td>
                <td className="py-3 px-4">
                  <Link to={`/community/${c.community_id}`} className="text-blue-500 hover:underline">
                    {c.community_name}
                  </Link>
                </td>
                <td className="py-3 px-4">{c.description}</td>
                <td className="py-3 px-4">{c.creator}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    c.isBlocked ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                  }`}>
                    {c.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-2">
                  <button
                    onClick={() => handleBlock([c.community_id])}
                    disabled={c.isBlocked}
                    className={`px-3 py-1 rounded ${
                      c.isBlocked 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    Block
                  </button>
                  <button
                    onClick={() => handleDelete([c.community_id])}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
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
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
        <div className="text-gray-300">
          Showing {(currentPage - 1) * recordPerPage + 1} to {Math.min(currentPage * recordPerPage, totalRecords)} of {totalRecords} communities
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          
          {Array.from({ length: Math.ceil(totalRecords / recordPerPage) }, (_, i) => i + 1)
            .slice(Math.max(0, currentPage - 3), Math.min(Math.ceil(totalRecords / recordPerPage), currentPage + 2))
            .map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded ${
                  currentPage === page 
                    ? 'bg-purple-600 text-white' 
                    : 'hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(totalRecords / recordPerPage)}
            className="px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selected.length > 0 && (
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => handleDelete(selected)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
          >
            Delete Selected ({selected.length})
          </button>
          <button
            onClick={() => handleBlock(selected)}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded"
          >
            Block Selected ({selected.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default CommunityList;