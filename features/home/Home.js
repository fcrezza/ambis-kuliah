import styled from 'styled-components';
import {ImNewspaper} from 'react-icons/im';

import {PostSkeleton} from 'components/Skeleton';
import Post from 'components/Post';
import WritePost from 'features/writePost';
import useDiscussions from './useDiscussions';

const HomeContainer = styled.main`
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

const TitleText = styled.h1`
  color: ${({theme}) => theme.colors['black.150']};
  margin: 0;
  font-size: 1.6rem;
`;

const TitleIcon = styled(ImNewspaper)`
  color: ${({theme}) => theme.colors['orange.50']};
  font-size: 2rem;
`;

const WritePostWrapper = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

function Home() {
  const {discussions} = useDiscussions();

  return (
    <HomeContainer>
      <TitleContainer>
        <TitleText>Beranda</TitleText>
        <TitleIcon />
      </TitleContainer>
      <WritePostWrapper>
        <WritePost />
      </WritePostWrapper>
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
    </HomeContainer>
  );
}

export default Home;
