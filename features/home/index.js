import useSWR from 'swr';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import {ImNewspaper} from 'react-icons/im';

import {PostSkeleton} from 'components/Skeleton';
import Post from 'components/Post';
import WritePost from 'features/writePost';
import useRoute from 'utils/route';
import axios from 'utils/axios';
import {useAuth} from 'utils/auth';
import {Button} from 'components/Button';

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
  useRoute(null, '/login');
  const {reload} = useRouter();
  const {userData} = useAuth();
  const topics = userData.topics.map(topic => topic.name).join(',');
  const {data: postsData, error} = useSWR(['/posts', topics], (url, arg) => {
    const combinedUrl = `${url}?topics=${arg}`;
    const fetchOptions = {
      withCredentials: true
    };
    return axios.get(combinedUrl, fetchOptions).then(({data}) => data);
  });

  return (
    <HomeContainer>
      <TitleContainer>
        <TitleText>Beranda</TitleText>
        <TitleIcon />
      </TitleContainer>
      <WritePostWrapper>
        <WritePost />
      </WritePostWrapper>
      {/* display error message when can't fetch posts data */}
      {error ? (
        <div>
          <h2>Tidak dapat memuat data</h2>
          <Button onClick={reload}>Coba lagi</Button>
        </div>
      ) : null}
      {/* display posts */}
      {postsData?.data.length && !error
        ? postsData.data.map(post => (
            <Post
              key={post.id}
              postID={post.id}
              title={post.title}
              text={post.contents}
              tags={post.topics}
              stats={post.stats}
              timestamp={post.timestamp}
              fullname={post.author.fullname}
              username={post.author.username}
              avatar={post.author.avatarUrl}
              showControl
            />
          ))
        : null}
      {/* display message when there are no posts related to user topics */}
      {!postsData?.data.length && !error ? (
        <div>Post tentang topik yang kamu ikuti akan tampil disini</div>
      ) : null}
      {/* display loading skeleton when fetching the data */}
      {!postsData && !error ? (
        <div>
          <PostSkeleton uniqueKey="post-skeleton-1" />
          <PostSkeleton uniqueKey="post-skeleton-2" />
          <PostSkeleton uniqueKey="post-skeleton-3" />
        </div>
      ) : null}
    </HomeContainer>
  );
}

export default Home;
