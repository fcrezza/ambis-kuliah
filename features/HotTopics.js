import React from 'react';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import {AiFillFire} from 'react-icons/ai';

import {TrendSkeleton} from 'components/Skeleton';
import Search from 'components/Search';
import Post from 'components/Post';
import {users, posts} from 'utils/data';

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

const TitleIcon = styled(AiFillFire)`
  color: ${({theme}) => theme.colors['orange.50']};
  font-size: 2rem;
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
        <HotTopicsPosts />
        <Copyright>© 2020 Ambis Kuliah. All rights reserved</Copyright>
      </HotTopicsContainer>
    );
  }

  return null;
}

function HotTopicsPosts() {
  const [discussions, setDiscussions] = React.useState(null);

  React.useEffect(() => {
    let data = posts.filter(post => !post.replyTo);
    data = data.map(post => {
      const user = users.find(user => user.id === post.userID);
      return {
        user,
        post
      };
    });

    setTimeout(() => {
      setDiscussions(data);
    }, 2000);
  }, []);

  return (
    <PostsContainer>
      <TitleContainer>
        <Title>Diskusi Terhangat</Title>
        <TitleIcon />
      </TitleContainer>
      {discussions
        ? discussions.map((discussion, idx) => (
            <Post
              key={idx}
              postID={discussion.post.id}
              title={discussion.post.title}
              tags={discussion.post.tags}
              fullname={discussion.user.fullname}
              username={discussion.user.username}
              avatar={discussion.user.avatar}
            />
          ))
        : Array(3)
            .fill()
            .map((_, idx) => (
              <TrendSkeleton uniqueKey={`trend-skeleton-${idx}`} key={idx} />
            ))}
    </PostsContainer>
  );
}

export default HotTopics;
