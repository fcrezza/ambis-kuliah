import React from 'react';
import styled from 'styled-components';

import Head from 'components/Head';
import {Button} from 'components/Button';
import Post from 'components/Post';
import {PostSkeleton} from 'components/Skeleton';
import useTopic from './useTopic';

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

function ExploreTag() {
  const {
    topicTitle,
    isFollowed,
    topicDiscussions,
    onFollowButtonClick
  } = useTopic();

  return (
    <Container>
      <Head
        title={`${topicTitle} - Ambis Kuliah`}
        description={`Eksplor diskusi yang menggunakan tag ${topicTitle}`}
      />
      <TitleContainer>
        <Title>{topicTitle}</Title>
        <Button onClick={onFollowButtonClick}>
          {isFollowed ? 'Diikuti' : 'Ikuti'}
        </Button>
      </TitleContainer>
      {topicDiscussions
        ? topicDiscussions.map((discussion, idx) => (
            <Post
              key={idx}
              postID={discussion.post.id}
              title={discussion.post.title}
              text={discussion.post.text}
              tags={discussion.post.tags}
              stats={discussion.post.stats}
              timestamp={discussion.post.timestamp}
              fullname={discussion.user.fullname}
              username={discussion.user.username}
              avatar={discussion.user.avatar}
              showControl
            />
          ))
        : Array(3)
            .fill()
            .map((_, idx) => (
              <PostSkeleton uniqueKey={`post-skeleton-${idx}`} key={idx} />
            ))}
    </Container>
  );
}

export default ExploreTag;
