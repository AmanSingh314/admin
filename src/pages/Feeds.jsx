import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeeds, blockFeed, removeFeed } from "../features/feeds/feedSlice";
import FeedList from "../components/FeedList";

const Feeds = () => {
  const dispatch = useDispatch();
  const { feeds } = useSelector((state) => state.feeds);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const handleBlock = (id) => {
    dispatch(blockFeed(id));
  };

  const handleRemove = (id) => {
    dispatch(removeFeed(id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Feed Management</h1>
      <FeedList
        feeds={feeds}
        onBlock={handleBlock}
        onRemove={handleRemove}
        type="feed"
      />
    </div>
  );
};

export default Feeds;
