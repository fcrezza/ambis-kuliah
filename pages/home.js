import React from 'react';
import styled from 'styled-components';
import {ImNewspaper} from 'react-icons/im';

import Head from 'components/Head';
import Post from 'components/Post';
import WritePost from 'components/WritePost';

const Container = styled.main`
  flex: 1;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
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

function home() {
  const posts = [
    {
      avatar: '/images/avatar1.png',
      name: 'Oscar Mingueza',
      title: 'Apa pendapat kalian tentang menteri kesehatan kita?',
      tags: ['Kesehatan', 'Umum', 'Politik'],
      text:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
      stats: {
        answer: 30,
        like: '650K'
      }
    },
    {
      avatar: '/images/avatar2.png',
      name: 'Dominic Soboszalai',
      title: 'Saranin laptop yang bagus buat kuliah dong',
      tags: ['Teknologi', 'Umum'],
      text:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
      stats: {
        answer: 30,
        like: 650
      }
    },
    {
      avatar: '/images/avatar3.png',
      name: 'Alejandro Balde',
      title: 'Unpopular opinion: Windows is sucks',
      text:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
      tags: ['Teknologi'],
      stats: {
        answer: 30,
        like: 65
      }
    }
  ];

  return (
    <Container>
      <Head title="Home - Ambis Kuliah" description="Ambis kuliah homepage" />
      <Title>
        <h1>Home</h1>
        <ImNewspaper size="2rem" />
      </Title>
      <WritePost />
      {posts.map((topic, idx) => (
        <Post key={idx} data={topic} showControl />
      ))}
    </Container>
  );
}

export default home;
