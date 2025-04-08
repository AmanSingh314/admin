import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommunities, deleteCommunity, blockCommunity } from '../features/communities/communititesSlice';
import CommunityList from '../components/CommunityList';

const Communities = () => {
  const dispatch = useDispatch();
  const { communities } = useSelector((state) => state.communities);

  useEffect(() => {
    dispatch(fetchCommunities());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteCommunity(id));
  };

  const handleBlock = (id) => {
    dispatch(blockCommunity(id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Community Management</h1>
      <CommunityList communities={communities} onDelete={handleDelete} onBlock={handleBlock} type="community" />
    </div>
  );
};

export default Communities;