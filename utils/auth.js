import React from 'react';
import useSWR from 'swr';

import axios from 'utils/axios';

const AuthContext = React.createContext();

export function AuthProvider({children}) {
  const {data: userData, mutate, error} = useSWR(
    '/auth/user',
    url => axios.get(url, {withCredentials: true}).then(res => res.data.data),
    {revalidateOnFocus: false}
  );

  const login = async data => {
    const response = await axios.post('/auth/login', data, {
      withCredentials: true
    });
    mutate(response.data.data, false);
  };

  const signup = async data => {
    const response = await axios.post('/auth/signup', data, {
      withCredentials: true
    });
    mutate(response.data.data, false);
  };

  const logout = () => {};

  const contextValue = {
    login,
    signup,
    logout,
    userData,
    error,
    updateProfile: mutate
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}
