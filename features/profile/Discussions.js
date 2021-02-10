import React from 'react';
import {useSWRInfinite} from 'swr';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import toast from 'react-hot-toast';

import Post from 'components/Post';
import {Button} from 'components/Button';
import axios from 'utils/axios';
import {upvotePost, downvotePost, deletePost} from 'utils/common/post';
import {useAuth} from 'utils/auth';
import Spinner from 'components/Spinner';

const Container = styled.div`
  border-radius: 10px 10px 0 0;
  border: 1px solid #d9d9d9;
  min-height: calc(100vh - 140px);
  overflow: hidden;
  padding-bottom: 100px;
  position: relative;
  background: ${({theme}) => theme.colors['white.50']};

  @media screen and (max-width: 768px) {
    border-radius: 0;
  }
`;

const TitleContainer = styled.div`
  padding: 1.5rem;
  border-bottom: ${({theme}) => `1px solid ${theme.colors['gray.100']}`};
`;

const Title = styled.h1`
  color: ${({theme}) => theme.colors['black.100']};
  font-size: 1.5rem;
  margin: 0;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const EmptyContainer = styled.div`
  padding: 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const EmptyText = styled.p`
  color: ${({theme}) => theme.colors['black.50']};
  margin: 0;
  font-size: 1rem;
  text-align: center;
  line-height: 30px;
`;

const ErrorContainer = styled.div`
  padding: 2rem;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: ${({theme}) => theme.colors['black.50']};
  font-size: 1rem;
  margin: 0 0 2rem;
`;

function getKey(pageIndex, previousPageData, username) {
  const limit = 20;

  if (!username) return null;
  // reached the end
  if (previousPageData && !previousPageData.next) return null;
  // first page, we don't have `previousPageData`
  if (pageIndex === 0) return `/posts/${username}?limit=${limit}`;
  // add the cursor to the API endpoint
  const {searchParams} = new URL(previousPageData.next);
  return `/posts/${username}?${searchParams}`;
}

function ProfilePosts({username}) {
  const {userData} = useAuth();
  const key = (pageIndex, previousPageData) =>
    getKey(pageIndex, previousPageData, username);
  const {data, error, mutate, isValidating, setSize} = useSWRInfinite(
    key,
    url => axios.get(url).then(({data}) => data.data)
  );

  let hasMore = false;

  if (Array.isArray(data) && !data[data.length - 1].next) {
    hasMore = false;
  } else if (data && data[data.length - 1].next) {
    hasMore = true;
  }

  let posts = [];

  if (Array.isArray(data)) {
    posts = data.map(({posts}) => posts).flat();
  }

  const handleUpvote = postId => {
    mutate(prevState => upvotePost(postId, userData.id, prevState), false);
  };

  const handleDownvote = postId => {
    mutate(prevState => downvotePost(postId, userData.id, prevState), false);
  };

  const handleDelete = async postId => {
    try {
      await mutate(
        prevState => deletePost(postId, userData.username, prevState),
        false
      );
      toast.success('Berhasil menghapus postingan');
    } catch (error) {
      toast.error('Gagal menghapus postingan');
    }
  };

  return (
    <Container>
      <TitleContainer>
        <Title>Postingan</Title>
      </TitleContainer>
      <InfiniteScroll
        dataLength={posts.length}
        next={() => setSize(size => size + 1)}
        hasMore={(hasMore && !error) || isValidating}
        loader={
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        }
        scrollThreshold="10px"
      >
        {posts.length
          ? posts.map(post => (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                description={
                  post.contents && post.contents.length > 200
                    ? `${post.contents.substring(0, 200)}...`
                    : post.contents
                }
                topics={post.topics}
                image={post.image}
                voteStats={post.stats.upvotes - post.stats.downvotes}
                replyStats={post.stats.replies}
                timestamp={post.timestamp}
                authorFullname={post.author.fullname}
                authorUsername={post.author.username}
                authorAvatar={post.author.avatar}
                isUpvote={post?.interactions?.upvote}
                isDownvote={post?.interactions?.downvote}
                handleUpvote={() => handleUpvote(post.id)}
                handleDownvote={() => handleDownvote(post.id)}
                handleDelete={() => handleDelete(post.id)}
                hasAuth={post.author.username === userData?.username}
              />
            ))
          : null}
        {!posts.length ? (
          <EmptyContainer>
            <EmptyText>Tidak ada apa-apa disini</EmptyText>
          </EmptyContainer>
        ) : null}
        {error && !isValidating ? (
          <ErrorContainer>
            <ErrorMessage>Tidak dapat memuat data</ErrorMessage>
            <Button onClick={() => mutate(prevData => prevData, true)}>
              Coba Lagi
            </Button>
          </ErrorContainer>
        ) : null}
      </InfiniteScroll>
    </Container>
  );
}

export default ProfilePosts;
