import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUsers, blockUsers } from '../features/users/userSlice';
import UserList from '../components/UserList';

const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (ids) => {
    dispatch(deleteUsers(ids));
  };

  const handleBlock = (ids) => {
    dispatch(blockUsers(ids));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <UserList users={users} onDelete={handleDelete} onBlock={handleBlock}  type="user" />
    </div>
  );
};

export default Users;