import React from 'react';
import useSWR from 'swr';
import {useRouter} from 'next/router';

import Head from 'components/Head';
import Post from 'components/Post';
import {Button} from 'components/Button';
import {PostSkeleton} from 'components/Skeleton';
import axios from 'utils/axios';
import {Container, Title, TitleContainer} from './utils';
import {useAuth} from 'utils/auth';

function ExploreTag() {
  const {query} = useRouter();
  const tag = query.tag;
  const {userData} = useAuth();
  const [isFollowed, setIsFollowed] = React.useState(() => {
    const userTopics = userData.topics.map(({name}) => name);
    const isExist = userTopics.includes(tag);
    return isExist;
  });
  const {data: postsData, mutate, error, isValidating} = useSWR(
    tag ? ['/posts', tag] : null,
    (url, arg) => {
      const combinedUrl = `${url}?topics=${arg}`;
      const fetchOptions = {
        withCredentials: true
      };
      return axios.get(combinedUrl, fetchOptions).then(({data}) => data.data);
    }
  );

  const onFollowButtonClick = () => {
    setIsFollowed(prevState => !prevState);
  };

  return (
    <Container>
      <Head
        title={`${tag} - Ambis Kuliah`}
        description={`Eksplor diskusi yang menggunakan tag ${tag}`}
      />
      <TitleContainer>
        <Title>{tag}</Title>
        <Button onClick={onFollowButtonClick}>
          {isFollowed ? 'Diikuti' : 'Ikuti'}
        </Button>
      </TitleContainer>
      {/* display error message when can't fetch posts data */}
      {error ? (
        <div>
          <h2>Tidak dapat memuat data</h2>
          <Button onClick={mutate}>Coba lagi</Button>
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
      {!isValidating && !postsData?.length && !error ? (
        <div>Tidak ada apa-apa disini</div>
      ) : null}
      {/* display loading skeleton when fetching the data */}
      {isValidating && !error ? (
        <div>
          <PostSkeleton uniqueKey="post-skeleton-1" />
          <PostSkeleton uniqueKey="post-skeleton-2" />
          <PostSkeleton uniqueKey="post-skeleton-3" />
        </div>
      ) : null}
    </Container>
  );
}

export default ExploreTag;
