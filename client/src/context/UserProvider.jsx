import { useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { deleteUser, fetchAllUsers } from '@/services/userService';
import { useAuth } from './AuthContext';

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const { loadingAuth } = useAuth();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchAllUsers();
        setUsers(usersData.data);
      } catch (err) {
        console.error('Failed to load users', err);
      }
    };

    if (!loadingAuth) {
      loadUsers();
    }

  }, [loadingAuth]);

  const handleDeleteUser = async (userId) => {
    await deleteUser(userId);
    setUsers((prev) => prev.filter((u) => u._id != userId));
  };

  return (
    <UserContext.Provider
      value={{
        users, handleDeleteUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
