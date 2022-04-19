import { useState, createContext, useContext, useEffect } from 'react';
import { getUser } from '../services/users';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      const currentUser = await getUser();
      setUser({ id: currentUser.id, username: currentUser.username });
    }
    fetchData();
  }, []);

  const userValues = { user, setUser };

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
