import React from 'react';
import {useRouter} from 'next/router';
import styled from 'styled-components';

import Post from 'components/Post';
import {PostSkeleton} from 'components/Skeleton';
import {posts, users} from 'utils/data';

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

function Discussion() {
  const [discussion, setDiscussion] = React.useState(null);
  const router = useRouter();

  React.useEffect(() => {
    if ('id' in router.query) {
      const post = posts.find(post => post.id === Number(router.query.id[1]));
      post.user = users.find(user => user.username === router.query.id[0]);
      let replies = posts.filter(
        ({replyTo}) =>
          replyTo?.postID === post.id && replyTo?.userID === post.user.id
      );
      replies = replies.map(reply => ({
        ...reply,
        user: users.find(user => user.id === reply.userID)
      }));
      setTimeout(() => {
        setDiscussion({post, replies});
      }, 3000);
    }
  }, [router]);

  return (
    <Container>
      <TitleContainer>
        <Title>Diskusi</Title>
      </TitleContainer>
      {discussion ? (
        <Post
          type="detail"
          postID={discussion.post.id}
          title={discussion.post.title}
          text={discussion.post.text}
          tags={discussion.post.tags}
          stats={discussion.post.stats}
          replyTo={discussion.post.replyTo}
          timestamp={discussion.post.timestamp}
          fullname={discussion.post.user.fullname}
          username={discussion.post.user.username}
          avatar={discussion.post.user.avatar}
          showControl
        />
      ) : (
        <PostSkeleton uniqueKey="post-discussion-skeleton" />
      )}
      {discussion
        ? discussion.replies.map(reply => (
            <Post
              key={reply.id}
              postID={reply.id}
              text={reply.text}
              stats={reply.stats}
              replyTo={reply.replyTo}
              timestamp={reply.timestamp}
              fullname={reply.user.fullname}
              username={reply.user.username}
              avatar={reply.user.avatar}
              showControl
            />
          ))
        : Array(3)
            .fill()
            .map((_, idx) => (
              <PostSkeleton key={idx} uniqueKey={`reply-discussion-${idx}`} />
            ))}
    </Container>
  );
}

export default Discussion;
