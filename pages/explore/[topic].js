import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useSWRInfinite} from 'swr';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import {toast} from 'react-hot-toast';

import Head from 'components/Head';
import Post from 'components/Post';
import {Button} from 'components/Button';
import axios from 'utils/axios';
import {useAuth} from 'utils/auth';
import {upvotePost, downvotePost, deletePost} from 'utils/common/post';
import Spinner from 'components/Spinner';

const Container = styled.main`
  flex: 1;
  border-radius: 10px 10px 0 0;
  border: 1px solid ${({theme}) => theme.colors['gray.100']};
  min-height: calc(100vh - 150px);
  padding-bottom: 5rem;
  position: relative;
  background: ${({theme}) => theme.colors['white.50']};

  @media screen and (max-width: 768px) {
    border: 0;
  }
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

const SpinnerContainer = styled.div`
  padding-top: 2rem;
  display: flex;
  justify-content: center;
`;

const EmptyContainer = styled.div`
  padding: 2rem 1.5rem;
  text-lign: center;
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

const TitleContainer = styled.div`
  padding: 1.5rem;
  border-bottom: ${({theme}) => `1px solid ${theme.colors['gray.100']}`};
`;

const Title = styled.h1`
  color: ${({theme}) => theme.colors['black.100']};
  font-size: 1.5rem;
  margin: 0;
`;

function fetcher(url) {
  return axios.get(url).then(({data}) => data.data);
}

function getKey(pageIndex, previousPageData, topic) {
  if (!topic) {
    return null;
  }

  // change this offset
  const startOffset = 20 * pageIndex || 1;
  const endOffset = 20;

  if (previousPageData && !previousPageData.length) {
    return null;
  }

  return `/posts?topics=${topic}&limit=${startOffset},${endOffset}`;
}

function Topic() {
  const {query} = useRouter();
  const topic = query.topic;
  const {userData} = useAuth();
  const key = (pageIndex, previousPageData) =>
    getKey(pageIndex, previousPageData, topic);
  const {data, error, mutate, isValidating, setSize} = useSWRInfinite(
    key,
    fetcher
  );
  let hasMore = true;
  const postData = Array.isArray(data) ? data.flat() : [];

  if (
    (Array.isArray(data) && data.length && !data[data.length - 1].length) ||
    error
  ) {
    hasMore = false;
  } else {
    hasMore = true;
  }

  const handleUpvote = postId => {
    mutate(prevData => upvotePost(postId, userData.id, prevData.flat()), false);
  };

  const handleDownvote = postId => {
    mutate(
      prevData => downvotePost(postId, userData.id, prevData.flat()),
      false
    );
  };

  const handleDelete = async postId => {
    try {
      await mutate(
        prevData => deletePost(postId, userData.username, prevData.flat()),
        false
      );
      toast.success('Berhasil menghapus postingan');
    } catch (e) {
      toast.error('Gagal menghapus postingan', {
        className: 'success'
      });
    }
  };

  return (
    <Container>
      <Head
        title={`${topic} - Ambis Kuliah`}
        description={`Jelajahi diskusi yang menggunakan topik ${topic}`}
      />
      <TitleContainer>
        <Title>{topic}</Title>
      </TitleContainer>
      <InfiniteScroll
        dataLength={postData.length}
        next={() => setSize(size => size + 1)}
        hasMore={isValidating || hasMore}
        loader={
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        }
        scrollThreshold="0px"
      >
        {Array.isArray(postData) && postData.length
          ? postData.map(post => (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                description={post.contents}
                topics={post.topics}
                voteStats={post.stats.upvotes - post.stats.downvotes}
                replyStats={post.stats.replies}
                timestamp={post.timestamp}
                authorFullname={post.author.fullname}
                authorUsername={post.author.username}
                authorAvatar={post.author.avatar.url}
                isUpvote={post?.feedback?.upvotes}
                isDownvote={post?.feedback?.downvotes}
                handleUpvote={() => handleUpvote(post.id)}
                handleDownvote={() => handleDownvote(post.id)}
                handleDelete={() => handleDelete(post.id)}
                hasAuth={userData?.username === post.author.username}
              />
            ))
          : null}
        {Array.isArray(postData) && !postData.length ? (
          <EmptyContainer>
            <EmptyText>Tidak ada apa-apa disini</EmptyText>
          </EmptyContainer>
        ) : null}
        {error && !isValidating && (
          <ErrorContainer>
            <ErrorMessage>Tidak dapat memuat data</ErrorMessage>
            <Button onClick={() => mutate()}>Coba Lagi</Button>
          </ErrorContainer>
        )}
      </InfiniteScroll>
    </Container>
  );
}

export default Topic;
