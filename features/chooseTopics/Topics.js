import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import useSWR from 'swr';
import {useErrorHandler} from 'react-error-boundary';
import {useRouter} from 'next/router';

import {Button} from 'components/Button';
import useRequest from 'utils/useRequest';
import {useAuth} from 'utils/auth';
import axios from 'utils/axios';
import {ErrorMessage} from 'components/Input';
import Spinner from 'components/Spinner';

const TopicsItemContainer = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const TopicsItemTitle = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({theme}) => theme.colors['black.100']};

  @media screen and (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const TopicsList = styled.div`
  border: 1px solid ${({theme}) => theme.colors['gray.100']};
  border-radius: 10px;
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
  color: ${({theme}) => theme.colors['black.100']};
  text-decoration: none;
  font-size: 1rem;
  padding: 10px;
  margin-right: 2rem;
  font-weight: 500;
  border-radius: 5px;
  background: transparent;

  &:hover,
  &:focus {
    background: ${({theme}) => theme.colors['gray.150']};
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

function Topics() {
  const {userData, updateProfile} = useAuth();
  const [selectedTopics, setTopics] = React.useState([]);
  const {requestStatus, changeRequestStatus} = useRequest();
  const {replace} = useRouter();
  const {data: topics, error} = useSWR(
    '/topics',
    url => axios.get(url).then(({data}) => data.data),
    {
      revalidateOnFocus: false
    }
  );
  useErrorHandler(error);

  if (!userData.signup) {
    replace('/home');
  }

  const onToggleSelect = topicId => {
    const isIncluded = selectedTopics.includes(topicId);

    if (isIncluded) {
      const filteredTopics = selectedTopics.filter(topic => topic !== topicId);
      setTopics(filteredTopics);
      return;
    }

    setTopics([...selectedTopics, topicId]);
  };

  React.useEffect(() => {
    return () => {
      updateProfile({signup: false});
    };
  }, []);

  const onSubmit = async () => {
    try {
      changeRequestStatus('loading', null);
      const data = {
        name: 'topics',
        data: selectedTopics
      };
      const response = await axios.put('/auth/user', data);
      updateProfile({
        topics: response.data.data
      });
      replace('/home');
    } catch (err) {
      changeRequestStatus('error', {
        message: 'Upzzz, ada yang salah'
      });
    }
  };

  if (!topics) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  return (
    <>
      <TopicsList>
        {topics.map(topic => {
          const isSelected = selectedTopics.includes(topic.id);
          return (
            <TopicsItemContainer key={topic.id}>
              <TopicsItemTitle>{topic.name}</TopicsItemTitle>
              <Button
                variant={isSelected ? 'default' : 'outline'}
                onClick={() => onToggleSelect(topic.id)}
              >
                {isSelected ? 'Diikuti' : 'Ikuti'}
              </Button>
            </TopicsItemContainer>
          );
        })}
      </TopicsList>
      {requestStatus.name === 'error' && (
        <ErrorMessage message={requestStatus.data.message} />
      )}
      <ButtonContainer>
        <Link href="/home" replace passHref>
          <SkipLink>Lewati</SkipLink>
        </Link>
        <Button
          onClick={onSubmit}
          disabled={!selectedTopics.length || requestStatus.name === 'loading'}
        >
          Simpan
        </Button>
      </ButtonContainer>
    </>
  );
}

export default Topics;
