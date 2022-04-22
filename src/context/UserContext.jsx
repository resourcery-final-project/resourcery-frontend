import { useState, createContext, useContext, useEffect } from 'react';
import { getUser } from '../services/users';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const currentUser = await getUser();
      setUser(
        currentUser
          ? { id: currentUser.id, username: currentUser.username }
          : {}
      );
      setLoading(false);
    }
    fetchData();
  }, []);

  const userValues = { user, setUser, loading };

  return (
    <UserContext.Provider value={userValues}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}
