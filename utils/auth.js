import React from 'react';
import {useErrorHandler} from 'react-error-boundary';
import useSWR from 'swr';

import axios from 'utils/axios';

const AuthContext = React.createContext();

export function AuthProvider({children}) {
  const {data: userData, mutate, error} = useSWR(
    '/auth/user',
    url => axios.get(url, {withCredentials: true}).then(res => res.data.data),
    {revalidateOnFocus: false}
  );
  useErrorHandler(error);

  const login = async data => {
    const response = await axios.post('/auth/login', data);
    mutate(response.data.data, false);
  };

  const signup = async data => {
    const response = await axios.post('/auth/signup', data);
    mutate({signup: true, ...response.data.data}, false);
  };

  const logout = async () => {
    await axios.delete('/auth/logout');
    mutate({}, false);
  };

  const updateProfile = newData => {
    mutate(
      prevData => ({
        ...prevData,
        ...newData
      }),
      false
    );
  };

  const contextValue = {
    login,
    signup,
    logout,
    userData,
    updateProfile
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}
