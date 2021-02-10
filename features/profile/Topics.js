import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import useSWR, {mutate} from 'swr';
import {ErrorBoundary, useErrorHandler} from 'react-error-boundary';

import TopicsModal from './TopicsModal';
import axios from 'utils/axios';
import Spinner from 'components/Spinner';
import {Button} from 'components/Button';

const ProfileTopicsContainer = styled.div`
  background: ${({theme}) => theme.colors['white.50']};
  border: 1px solid ${({theme}) => theme.colors['gray.100']};
  border-radius: 10px;
`;

const TitleContainer = styled.div`
  border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  margin: 0;
  color: ${({theme}) => theme.colors['black.100']};
`;

const ChangeButton = styled.button`
  color: ${({theme}) => theme.colors['black.100']};
  font-weight: 500;
  font-size: 1rem;
  padding: 10px;
  border: 0;
  border-radius: 5px;
  background: transparent;
  cursor: pointer;

  &:focus,
  &:hover {
    background: ${({theme}) => theme.colors['gray.150']};
  }
`;

const TopicItem = styled.a`
  text-decoration: none;
  padding: 6px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid ${({theme}) => theme.colors['black.100']};
  color: ${({theme}) => theme.colors['black.100']};
`;
const TopicsContainer = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;

  & > ${TopicItem}:not(:last-child) {
    margin-right: 10px;
  }
`;

const EmptyContainer = styled.div`
  padding: 2rem 1.5rem;
  margin: 0 auto;
`;

const EmptyText = styled.p`
  color: ${({theme}) => theme.colors['black.50']};
  margin: 0;
  font-size: 1rem;
  text-align: center;
  line-height: 30px;
`;

const ErrorContainer = styled.div`
  padding: 2rem;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: ${({theme}) => theme.colors['black.50']};
  font-size: 1rem;
`;

const SpinnerContainer = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
`;

function ProfileTopics({topics, isAdmin}) {
  if (isAdmin) {
    return (
      <ProfileTopicsContainer>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Topics topics={topics} />
        </ErrorBoundary>
      </ProfileTopicsContainer>
    );
  }

  return null;
}

function fetcher(url) {
  return axios.get(url).then(({data}) => data.data);
}

function Topics({topics}) {
  const [isModalOpen, setModalState] = React.useState(false);
  const {data: topicsData, error} = useSWR('/topics', fetcher, {
    revalidateOnFocus: false
  });
  useErrorHandler(error);

  const onClickEdit = () => {
    setModalState(true);
  };

  const onCloseModal = () => {
    setModalState(false);
  };

  if (!topicsData) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  return (
    <>
      <TitleContainer>
        <Title>Topik yang diikuti</Title>
        <ChangeButton onClick={onClickEdit}>Ubah</ChangeButton>
      </TitleContainer>
      <TopicsContainer>
        {topics.length ? (
          topics.map(topic => (
            <Link key={topic.id} href={`/explore/${topic.name}`} passHref>
              <TopicItem>{topic.name}</TopicItem>
            </Link>
          ))
        ) : (
          <EmptyContainer>
            <EmptyText>Kamu belum mengikuti topik apapun</EmptyText>
          </EmptyContainer>
        )}
      </TopicsContainer>
      <TopicsModal
        topics={topics}
        topicsData={topicsData}
        isOpen={isModalOpen}
        onClose={onCloseModal}
      />
    </>
  );
}

function ErrorFallback({error, resetErrorBoundary}) {
  const reset = async () => {
    await mutate(error.config.url, null, true);
    resetErrorBoundary();
    return;
  };

  if (error.request) {
    return (
      <ErrorContainer>
        <ErrorMessage>Upzzz, tidak dapat memuat data</ErrorMessage>
        <Button onClick={reset}>Coba Lagi</Button>
      </ErrorContainer>
    );
  }

  return (
    <ErrorContainer>
      <ErrorMessage>Upzzz, Ada yang salah</ErrorMessage>
      <Button onClick={resetErrorBoundary}>Coba Lagi</Button>
    </ErrorContainer>
  );
}

export default ProfileTopics;
