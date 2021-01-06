import React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import NextLink from 'next/link';

import TopicsItem from './TopicsItem';
import {Button} from 'components/Button';
import useTopics from './useTopics';
import {useUser} from 'utils/user';
import useRoute from 'utils/route';
import axios from 'utils/axios';
import LoadingSkeleton from './LoadingSkeleton';
import useRequest from 'utils/request';
import {useRouter} from 'next/router';

const TopicsContainer = styled.div`
  max-width: 750px;
  padding: 100px;

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
  color: ${({theme}) => theme.colors['black.150']};
  font-size: 2.6rem;
  line-height: 70px;
  margin: 0 0 1.5rem;

  @media screen and (max-width: 1024px) {
    font-size: 2.2rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1.8rem;
    line-height: 60px;
  }
`;

const TopicsDescription = styled.p`
  color: ${({theme}) => theme.colors['black.100']};
  font-size: 1.2rem;
  line-height: 40px;
  margin: 0 0 3rem;

  @media screen and (max-width: 480px) {
    font-size: 1.1rem;
    line-height: 35px;
  }
`;

const TopicsWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto 200px;
`;

const TopicsList = styled.div`
  border: 1px solid ${({theme}) => theme.colors['gray.100']};
  border-radius: 5px;
  width: 100%;

  & > div:not(:last-child) {
    border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  text-align: right;
  margin-top: 2rem;
`;

const SkipLink = styled.a`
  text-decoration: none;
  color: ${({theme}) => theme.colors['orange.50']};
  font-size: 1.2rem;
  margin-right: 2rem;
`;

const ErrorContainer = styled.div``;

const ErrorMessage = styled.h2`
  color: ${({theme}) => theme.colors['black.150']};
  font-size: 1.5rem;
  line-height: 40px;
  margin: 0 0 1.5rem;
`;

const SubmitErrorMessage = styled.p`
  font-size: 1rem;
  color: ${({theme}) => theme.colors['red.50']};
  margin: 1rem 0;
`;

function Topics() {
  const {selectedTopics, onToggleSelect, onSaveTopics} = useTopics();
  const {
    requestStatus: submitStatus,
    onChangeRequestStatus: setSubmitStatus
  } = useRequest();
  const router = useRouter();
  const {userData} = useUser();
  const {data: topics, error, mutate} = useSWR('/api/topics.php', url =>
    axios.get(url, {withCredentials: true}).then(res => res.data)
  );
  // eslint-disable-next-line
  const route = useRoute();

  const onRetry = () => {
    mutate();
  };

  const onSubmit = async () => {
    try {
      setSubmitStatus('loading');
      await onSaveTopics(userData.id);
      router.push('/home');
    } catch (err) {
      setSubmitStatus('error', err);
    }
  };

  return (
    <TopicsWrapper>
      <TopicsContainer>
        <TopicsTitle>Ikuti Topik</TopicsTitle>
        <TopicsDescription>
          Pilih topik yang ingin kamu ikuti, diskusi tentang topik terkait akan
          mancul dihalaman utama kamu.
        </TopicsDescription>
        {topics && !error ? (
          <>
            <TopicsList>
              {topics.data.map(topic => {
                const isSelected = selectedTopics.includes(topic.id);
                return (
                  <TopicsItem
                    key={topic.id}
                    isSelected={isSelected}
                    title={topic.name}
                    onToggleSelect={() => onToggleSelect(topic.id)}
                  />
                );
              })}
            </TopicsList>
            {submitStatus.name === 'error' && (
              <SubmitErrorMessage>
                Upsss ada yang tidak beres, coba beberapa saat lagi
              </SubmitErrorMessage>
            )}
            <ButtonContainer>
              <NextLink href="/home" passHref>
                <SkipLink>Lewati</SkipLink>
              </NextLink>
              <Button
                onClick={onSubmit}
                disabled={
                  !selectedTopics.length || submitStatus.name === 'loading'
                }
              >
                Simpan
              </Button>
            </ButtonContainer>
          </>
        ) : error ? (
          <ErrorContainer>
            <ErrorMessage>
              Data tidak dapat dimuat, coba beberapa saat lagi
            </ErrorMessage>
            <Button onClick={onRetry}>Coba lagi</Button>
          </ErrorContainer>
        ) : (
          Array(5)
            .fill()
            .map((_, idx) => (
              <LoadingSkeleton
                uniqueKey={`loading-skeleton-${idx}`}
                width="100%"
                viewBox="0 0 100% 100"
                key={idx}
              />
            ))
        )}
      </TopicsContainer>
    </TopicsWrapper>
  );
}

export default Topics;
