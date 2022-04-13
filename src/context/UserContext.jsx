import { useState, createContext, useContext } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  function signIn(username, password) {
    
  }

}
