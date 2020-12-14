import React from 'react';

import {users} from 'utils/data';

const AuthContext = React.createContext();

export function AuthProvider({children}) {
  const [user, setUser] = React.useState(users[2]);

  const login = () => {
    setUser(users[2]);
  };

  const logout = () => {
    setUser(null);
  };

  const contextValue = {
    login,
    logout,
    user
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const authData = React.useContext(AuthContext);
  return authData;
}
