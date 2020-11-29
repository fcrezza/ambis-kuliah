import React from 'react';
import styled from 'styled-components';
import {ImNewspaper} from 'react-icons/im';

import Head from 'components/Head';
import Post from 'components/Post';
import WritePost from 'components/WritePost';
import {posts} from 'utils/data';

const Container = styled.main`
  flex: 1;
  border-radius: 5px;
  border: 1px solid #d9d9d9;

  @media screen and (max-width: 768px) {
    border: 0;
  }
`;

const Title = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    color: ${({theme}) => theme.colors['black.150']};
    margin: 0;
    font-size: 1.6rem;
  }

  svg {
    color: ${({theme}) => theme.colors['orange.50']};
  }
`;

const Wrapper = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

function home() {
  return (
    <Container>
      <Head title="Home - Ambis Kuliah" description="Ambis kuliah homepage" />
      <Title>
        <h1>Home</h1>
        <ImNewspaper size="2rem" />
      </Title>
      <Wrapper>
        <WritePost />
      </Wrapper>
      {posts.map((topic, idx) => (
        <Post key={idx} data={topic} showControl />
      ))}
    </Container>
  );
}

export default home;
