import React from 'react';
import styled from 'styled-components';
import {ErrorBoundary} from 'react-error-boundary';

import ErrorFallback from './ErrorFallback';
import Logo from './Logo';
import {AuthProvider, useAuth} from 'utils/auth';

const Container = styled.div`
  min-width: 100%;
  min-height: 100vh;
  background-color: ${({theme}) => theme.colors['white.50']};
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Init({children}) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <SplashScreen>{children}</SplashScreen>
      </AuthProvider>
    </ErrorBoundary>
  );
}

function SplashScreen({children}) {
  const {userData} = useAuth();

  if (!userData) {
    return (
      <Container>
        <Logo width="70" height="70" />
      </Container>
    );
  }

  return children;
}

export default Init;
