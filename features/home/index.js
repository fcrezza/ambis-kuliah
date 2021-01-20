import useSWR from 'swr';
import {useRouter} from 'next/router';

import WritePost from 'features/writePost';
import Post from 'components/Post';
import useRoute from 'utils/route';
import axios from 'utils/axios';
import {Button} from 'components/Button';
import {PostSkeleton} from 'components/Skeleton';
import {useAuth} from 'utils/auth';
import {
  HomeContainer,
  TitleContainer,
  TitleIcon,
  TitleText,
  WritePostWrapper
} from './utils';

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
    return axios.get(combinedUrl, fetchOptions).then(({data}) => data.data);
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
      {postsData?.length && !error
        ? postsData.map(post => (
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
      {!postsData?.length && !error ? (
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
