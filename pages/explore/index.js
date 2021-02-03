import React from 'react';
import useSWR from 'swr';
import styled from 'styled-components';
import Link from 'next/link';
import {lighten} from 'polished';

import Head from 'components/Head';
// import ExploreModal from 'features/explore/Modal';
import Search from 'components/Search';
import axios from 'utils/axios';
import {Button} from 'components/Button';

const Container = styled.main`
  border-radius: 10px 10px 0 0;
  border: 1px solid #d9d9d9;
  min-height: calc(100vh - 150px);
  overflow: hidden;
  flex: 1;
  padding-bottom: 100px;
  position: relative;

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

const TopicItemContainer = styled.a`
  display: block;
  text-decoration: none;
  padding: 1.5rem;
  border-bottom: ${({theme}) => `1px solid ${theme.colors['gray.100']}`};
  color: ${({theme}) => theme.colors['black.100']};
  font-weight: 500;
  font-size: 1.1rem;

  &:hover,
  &:focus {
    background-color: ${({theme}) => lighten(0.01, theme.colors['gray.50'])};
  }
`;

function Explore() {
  const {data: topics, error, mutate} = useSWR(
    '/topics',
    url => axios.get(url).then(({data}) => data.data),
    {revalidateOnFocus: false}
  );

  return (
    <Container>
      <Head
        title="Eksplor topik - Ambis Kuliah"
        description="Eksplor berbagai macam topik diskusi"
      />
      {/* <ExploreModal
        topics={topics}
        isOpen={isModalOpen}
        onClose={onModalClose}
      /> */}
      <SearchContainer>
        <Search placeholder="Cari Diskusi" />
      </SearchContainer>
      {error && !topics ? (
        <div style={{textAlign: 'center'}}>
          <h2>Uppzz, ada yang salah</h2>
          <Button onClick={mutate}>Coba lagi</Button>
        </div>
      ) : !error && !topics ? (
        <div
          style={{
            textAlign: 'center'
          }}
        >
          Memuat data...
        </div>
      ) : (
        topics.map(topic => (
          <Link key={topic.id} href={`/explore/${topic.name}`} passHref>
            <TopicItemContainer>{topic.name}</TopicItemContainer>
          </Link>
        ))
      )}
    </Container>
  );
}

export default Explore;
