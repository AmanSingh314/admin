import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchFeeds, blockFeed, removeFeed } from "../features/feeds/feedSlice";
import { toast } from "react-hot-toast";

const FeedList = ({ type }) => {
  const dispatch = useDispatch();
  const { feeds, loading, error, pagination } = useSelector(
    (state) => state.feeds
  );
  const [currentPage, setCurrentPage] = useState(1);
  const feedsPerPage = 10;

  useEffect(() => {
    dispatch(
      fetchFeeds({
        record_per_page: feedsPerPage,
        page_number: currentPage,
        sort: "asc",
      })
    );
  }, [dispatch, currentPage]);

  const handleBlock = (id) => {
    dispatch(blockFeed(id))
      .unwrap()
      .then(() => {
        toast.success("Feed blocked successfully!");
      })
      .catch(() => {
        toast.error("Failed to block feed.");
      });
  };

  const handleRemove = (id) => {
    dispatch(removeFeed(id))
      .unwrap()
      .then(() => {
        toast.success("Feed removed successfully!");
      })
      .catch(() => {
        toast.error("Failed to remove feed.");
      });
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 rounded-xl shadow-lg drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Feed List</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Feed ID</th>
              <th className="py-3 px-4 text-left">Content</th>
              <th className="py-3 px-4 text-left">Likes</th>
              <th className="py-3 px-4 text-left">Comments</th>
              <th className="py-3 px-4 text-left">Bookmarks</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {feeds.map((feed) => (
              <tr
                key={feed.id}
                className="border-b hover:bg-gray-100 transition duration-200"
              >
                <td className="py-3 px-4">
                  <Link
                    to={`/feed/${feed.feed_system_code}`}
                    className="text-blue-500 hover:underline"
                  >
              
                    {feed.feed_id}
                  </Link>
                </td>
                <td className="py-3 px-4 truncate max-w-xs">{feed.content}</td>
                <td className="py-3 px-4">{feed.total_like}</td>
                <td className="py-3 px-4">{feed.total_comment}</td>
                <td className="py-3 px-4">{feed.total_bookmark}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button
                    onClick={() => handleBlock(feed.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-300"
                  >
                    Block
                  </button>
                  <button
                    onClick={() => handleRemove(feed.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-300"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1 ? "cursor-not-allowed" : ""
            } transition duration-300`}
          >
            {"<<"}
          </button>
          <span className="text-gray-500">
            Page {currentPage} of{" "}
            {Math.ceil(pagination.totalRecords / feedsPerPage)}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(
                  prev + 1,
                  Math.ceil(pagination.totalRecords / feedsPerPage)
                )
              )
            }
            disabled={
              currentPage === Math.ceil(pagination.totalRecords / feedsPerPage)
            }
            className={`px-4 py-2 rounded ${
              currentPage === Math.ceil(pagination.totalRecords / feedsPerPage)
                ? "cursor-not-allowed"
                : ""
            } transition duration-300`}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedList;
