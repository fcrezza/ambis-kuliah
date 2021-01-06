import React from 'react';

import {useAuth} from './auth';

const UserContext = React.createContext();

export function UserProvider({children}) {
  const {userData, error} = useAuth();

  if (!userData && !error) {
    return 'loading...';
  }

  if (error && !error.response) {
    return 'coba lagi yuk';
  }

  return (
    <UserContext.Provider value={{userData}}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  return React.useContext(UserContext);
}
