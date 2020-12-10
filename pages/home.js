import React from 'react';
import styled from 'styled-components';
import {ImNewspaper} from 'react-icons/im';

import {PostSkeleton} from 'components/Skeleton';
import Head from 'components/Head';
import Post from 'components/Post';
import WritePost from 'components/WritePost';
import {posts, users} from 'utils/data';

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
    }, 3000);
  }, []);

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
      {discussions
        ? discussions.map((discussion, idx) => (
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

export default home;
