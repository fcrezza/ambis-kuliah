import React from 'react';
import {useRouter} from 'next/router';
import styled from 'styled-components';

import Head from 'components/Head';
import {Button} from 'components/Button';
import Post from 'components/Post';
import {posts} from 'utils/data';

const Container = styled.main`
  flex: 1;
  border-radius: 5px;
  border: 1px solid #d9d9d9;

  @media screen and (max-width: 768px) {
    border: 0;
  }
`;

const TitleContainer = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  color: ${({theme}) => theme.colors['black.150']};
  margin: 0;
  font-size: 1.6rem;
`;

function exploreTag() {
  const router = useRouter();
  const [isFollowed, setIsFollowed] = React.useState(true);

  const onFollowButtonClick = () => {
    setIsFollowed(prevState => !prevState);
  };

  return (
    <Container>
      <Head
        title={`${router.query.tag} - Ambis Kuliah`}
        description={`Eksplor diskusi yang menggunakan tag ${router.query.tag}`}
      />
      <TitleContainer>
        <Title>{router.query.tag}</Title>
        <Button onClick={onFollowButtonClick}>
          {isFollowed ? 'Diikuti' : 'Ikuti'}
        </Button>
      </TitleContainer>
      {posts.map((post, idx) => (
        <Post key={idx} data={post} showControl />
      ))}
    </Container>
  );
}

export default exploreTag;
