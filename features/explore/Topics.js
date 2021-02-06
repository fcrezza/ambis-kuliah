import Spinner from 'components/Spinner';
import {useErrorHandler} from 'react-error-boundary';
import useSWR from 'swr';
import Link from 'next/link';
import {lighten} from 'polished';
import styled from 'styled-components';

import axios from 'utils/axios';
const TopicItemContainer = styled.a`
  display: block;
  text-decoration: none;
  padding: 1.5rem;
  border-bottom: ${({theme}) => `1px solid ${theme.colors['gray.100']}`};
  color: ${({theme}) => theme.colors['black.100']};
  font-weight: 500;
  font-size: 1rem;

  &:hover,
  &:focus {
    background-color: ${({theme}) => lighten(0.01, theme.colors['gray.50'])};
  }
`;

const SpinnerContainer = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function fetcher(url) {
  return axios.get(url).then(({data}) => data.data);
}

function Topics() {
  const {data: topics, error} = useSWR('/topics', fetcher, {
    revalidateOnFocus: false
  });
  useErrorHandler(error);

  if (!topics) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  return topics.map(topic => (
    <Link key={topic.id} href={`/explore/${topic.name}`} passHref>
      <TopicItemContainer>{topic.name}</TopicItemContainer>
    </Link>
  ));
}

export default Topics;
