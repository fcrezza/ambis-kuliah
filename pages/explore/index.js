import React from 'react';
import styled from 'styled-components';
import {ErrorBoundary} from 'react-error-boundary';

import Head from 'components/Head';
import Search from 'components/Search';
import Topics from 'features/explore/Topics';
import ErrorFallback from 'features/explore/ErrorFallback';

const Container = styled.main`
  border-radius: 10px 10px 0 0;
  border: 1px solid #d9d9d9;
  min-height: calc(100vh - 150px);
  overflow: hidden;
  flex: 1;
  padding-bottom: 100px;
  position: relative;
  background: ${({theme}) => theme.colors['white.50']};

  @media screen and (max-width: 768px) {
    border-radius: 0;
  }
`;

const SearchContainer = styled.div`
  padding: 1.5rem;
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const TitleContainer = styled.div`
  padding: 1.5rem;
  border-bottom: ${({theme}) => `1px solid ${theme.colors['gray.100']}`};
`;

const Title = styled.h1`
  color: ${({theme}) => theme.colors['black.100']};
  font-size: 1.5rem;
  margin: 0;
`;

function Explore() {
  return (
    <Container>
      <Head
        title="Jelajahi topik - Ambis Kuliah"
        description="Jelajahi berbagai macam topik diskusi"
      />
      <TitleContainer>
        <Title>Jelajahi</Title>
      </TitleContainer>
      <SearchContainer>
        <Search placeholder="Cari Diskusi" />
      </SearchContainer>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Topics />
      </ErrorBoundary>
    </Container>
  );
}

export default Explore;
