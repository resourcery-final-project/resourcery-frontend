import { useState, createContext, useContext } from 'react';
import { getUser } from '../services/users';


const UserContext = createContext();

export function UserProvider({ children }) {
  const currentUser = getUser();

  const [user, setUser] = useState(
    currentUser ? { id: currentUser.id, username: currentUser.username } : {}
  );

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
