import React from 'react';
import styled from 'styled-components';
import {ErrorBoundary} from 'react-error-boundary';

import Head from 'components/Head';
import {Topics, ErrorFallback} from 'features/chooseTopics';
import {AuthenticatedRoute} from 'components/Route';

const TopicsContainer = styled.div`
  width: 500px;
  margin: 0 auto 200px;
  padding: 2rem;
  background: ${({theme}) => theme.colors['white.50']};
  border-radius: 10px;
  border: 1px solid ${({theme}) => theme.colors['gray.100']};

  @media screen and (max-width: 1024px) {
    padding: 40px 70px;
    max-width: 600px;
  }

  @media screen and (max-width: 768px) {
    padding: 40px 50px;
  }

  @media screen and (max-width: 480px) {
    padding: 40px 1.5rem;
  }
`;

const TopicsTitle = styled.h1`
  color: ${({theme}) => theme.colors['black.100']};
  font-size: 2rem;
  margin: 0 0 1.5rem;

  @media screen and (max-width: 1024px) {
    font-size: 1rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1.8rem;
    line-height: 60px;
  }
`;

const TopicsDescription = styled.p`
  color: ${({theme}) => theme.colors['black.50']};
  font-size: 1.1rem;
  line-height: 35px;
  margin: 0 0 2.5rem;

  @media screen and (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

function ChooseTopics() {
  return (
    <AuthenticatedRoute>
      <Head
        title="Ikuti Topik - Pilih topik yang ingin kamu ikuti"
        description="Ikuti topik, diskusi tentang topik terkait akan mancul dihalaman utama kamu."
      />
      <TopicsContainer>
        <TopicsTitle>Ikuti Topik</TopicsTitle>
        <TopicsDescription>
          Pilih topik yang ingin kamu ikuti, diskusi tentang topik terkait akan
          mancul dihalaman utama kamu.
        </TopicsDescription>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Topics />
        </ErrorBoundary>
      </TopicsContainer>
    </AuthenticatedRoute>
  );
}

export default ChooseTopics;
