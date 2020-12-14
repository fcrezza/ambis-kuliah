import styled from 'styled-components';
import {AiFillFire} from 'react-icons/ai';

import useHotDiscussions from './useHotDiscussions';
import {TrendSkeleton} from 'components/Skeleton';
import Post from 'components/Post';

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

function HotTopicsPosts() {
  const {hotDiscussions} = useHotDiscussions();

  return (
    <PostsContainer>
      <TitleContainer>
        <Title>Diskusi Terhangat</Title>
        <TitleIcon />
      </TitleContainer>
      {hotDiscussions
        ? hotDiscussions.map((discussion, idx) => (
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

export default HotTopicsPosts;
