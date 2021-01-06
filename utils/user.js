import React from 'react';
import styled, {useTheme} from 'styled-components';

import Logo from 'components/Logo';
import {Button} from 'components/Button';
import {useAuth} from './auth';
import {useRouter} from 'next/router';

const Container = styled.div`
  min-width: 100%;
  min-height: 100vh;
  background-color: ${({theme}) => theme.colors['white.50']};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorMessage = styled.h1`
  font-size: 1.5rem;
  color: ${({theme}) => theme.colors['black.150']};
  margin: 0 0 1.5rem;
`;

const ContentWrapper = styled.div`
  text-align: center;
`;

const UserContext = React.createContext();

export function UserProvider({children}) {
  const {userData, error} = useAuth();
  const theme = useTheme();
  const router = useRouter();

  const onReload = () => {
    router.reload();
  };

  if (!userData && !error) {
    return (
      <Container>
        <Logo width="70" height="70" fill={theme.colors['orange.50']} />
      </Container>
    );
  }

  if (error && !error.response) {
    return (
      <Container>
        <ContentWrapper>
          <ErrorMessage>Upss... ada yang tidak beres</ErrorMessage>
          <Button onClick={onReload}>Coba lagi</Button>
        </ContentWrapper>
      </Container>
    );
  }

  return (
    <UserContext.Provider value={{userData}}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  return React.useContext(UserContext);
}
