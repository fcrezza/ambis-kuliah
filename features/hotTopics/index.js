import React from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/router';

const Container = styled.div`
  width: 500px;
  margin-left: 3rem;

  & > *:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  @media screen and (max-width: 1440px) {
    max-width: 340px;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Copyright = styled.p`
  color: ${({theme}) => theme.colors['black.50']};
  font-size: 0.8rem;
  margin: 0;
`;

const PostsContainer = styled.div`
  border: 1px solid ${({theme}) => theme.colors['gray.100']};
  border-radius: 5px;
  width: 100%;

  & > div:not(:last-child) {
    border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
  }
`;

const TitleContainer = styled.div`
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
`;

const Title = styled.h2`
  color: ${({theme}) => theme.colors['black.150']};
  font-size: 1.4rem;
  margin: 0;
`;

function HotTopics() {
  const router = useRouter();
  const isShowed = !['/', '/login', '/signup', '/signup/topics'].includes(
    router.pathname
  );

  if (isShowed) {
    return (
      <Container>
        <PostsContainer>
          <TitleContainer>
            <Title>Diskusi Terhangat</Title>
          </TitleContainer>
        </PostsContainer>
        <Copyright>© 2020 Ambis Kuliah. All rights reserved</Copyright>
      </Container>
    );
  }

  return null;
}

export default HotTopics;
