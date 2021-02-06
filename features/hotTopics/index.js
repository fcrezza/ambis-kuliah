import React from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import {ErrorBoundary} from 'react-error-boundary';

import Post from './Post';
import ErrorFallback from './ErrorFallback';

const Container = styled.div`
  width: 400px;
  margin-left: 3rem;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  background: ${({theme}) => theme.colors['white.50']};

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const TitleContainer = styled.div`
  padding: 1.2rem;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
`;

const Title = styled.h2`
  color: ${({theme}) => theme.colors['black.100']};
  font-size: 1.5rem;
  margin: 0;
`;

function HotPosts() {
  const router = useRouter();
  const isShowed =
    router.pathname !== '/' &&
    !['/login', '/signup', '/auth'].find(route =>
      router.pathname.startsWith(route)
    );

  if (isShowed) {
    return (
      <Container>
        <TitleContainer>
          <Title>Diskusi Terhangat</Title>
        </TitleContainer>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Post />
        </ErrorBoundary>
      </Container>
    );
  }

  return null;
}

export default HotPosts;
