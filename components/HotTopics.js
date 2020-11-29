import {useRouter} from 'next/router';
import styled from 'styled-components';
import {AiFillFire} from 'react-icons/ai';

import Search from 'components/Search';
import Post from 'components/Post';

const HotTopicsContainer = styled.div`
  max-width: 400px;
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

const PostsContainer = styled.div`
  border: 1px solid ${({theme}) => theme.colors['gray.100']};
  border-radius: 5px;
  width: 100%;

  & > div:not(:last-child) {
    border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
  }
`;

const Title = styled.div`
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};

  h2 {
    color: ${({theme}) => theme.colors['black.150']};
    font-size: 1.4rem;
    margin: 0;
  }

  svg {
    color: ${({theme}) => theme.colors['orange.50']};
  }
`;

const Copyright = styled.p`
  color: ${({theme}) => theme.colors['black.50']};
  font-size: 0.8rem;
  margin: 0;
`;

function HotTopics() {
  const router = useRouter();
  const isShowed = !['/', '/topics'].includes(router.pathname);

  if (isShowed) {
    return (
      <HotTopicsContainer>
        <Search placeholder="Cari diskusi" />
        <Posts />
        <Copyright>© 2020 Ambis Kuliah. All rights reserved</Copyright>
      </HotTopicsContainer>
    );
  }

  return null;
}

function Posts() {
  const posts = [
    {
      avatar: '/images/avatar1.png',
      name: 'Oscar Mingueza',
      title: 'Apa pendapat kalian tentang menteri kesehatan kita?',
      tags: ['Kesehatan', 'Umum', 'Politik']
    },
    {
      avatar: '/images/avatar2.png',
      name: 'Dominic Soboszalai',
      title: 'Saranin laptop yang bagus buat kuliah dong',
      tags: ['Teknologi', 'Umum']
    },
    {
      avatar: '/images/avatar3.png',
      name: 'Alejandro Balde',
      title: 'Unpopular opinion: Windows is sucks',
      tags: ['Teknologi']
    }
  ];

  return (
    <PostsContainer>
      <Title>
        <h2>Diskusi Terhangat</h2>
        <AiFillFire size="2rem" />
      </Title>
      {posts.map((post, idx) => (
        <Post key={idx} data={post} />
      ))}
    </PostsContainer>
  );
}

export default HotTopics;
