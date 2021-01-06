import React from 'react';
import useSWR from 'swr';

import axios from 'utils/axios';

const AuthContext = React.createContext();

export function AuthProvider({children}) {
  const {data: userData, mutate, error} = useSWR(
    '/api/auth.php',
    url => axios.get(url, {withCredentials: true}).then(res => res.data),
    {revalidateOnFocus: false}
  );

  const login = async data => {
    const response = await axios.post('/api/login.php', data);
    mutate(response.data, false);
  };

  const signup = async data => {
    const response = await axios.post('/api/signup.php', data);
    mutate(response.data, false);
  };

  const logout = () => {};

  const contextValue = {
    login,
    signup,
    logout,
    userData,
    error
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}
