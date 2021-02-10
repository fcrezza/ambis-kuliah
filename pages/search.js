import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useSWRInfinite} from 'swr';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import {toast} from 'react-hot-toast';

import Spinner from 'components/Spinner';
import Head from 'components/Head';
import Post from 'components/Post';
import {Button} from 'components/Button';
import axios from 'utils/axios';
import {useAuth} from 'utils/auth';
import {upvotePost, downvotePost, deletePost} from 'utils/common/post';

const Container = styled.main`
  border: 1px solid ${({theme}) => theme.colors['gray.100']};
  flex: 1;
  border-radius: 10px 10px 0 0;
  min-height: calc(100vh - 140px);
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

function getKey(pageIndex, previousPageData, keywords) {
  const limit = 20;

  if (!keywords) return null;
  // reached the end
  if (previousPageData && !previousPageData.next) return null;
  // first page, we don't have `previousPageData`
  if (pageIndex === 0) return `/posts?keywords=${keywords}&limit=${limit}`;
  // add the cursor to the API endpoint
  const {searchParams} = new URL(previousPageData.next);
  return `/posts?${searchParams}`;
}

function Search() {
  const {query} = useRouter();
  const keywords = query.keywords;
  const {userData} = useAuth();
  const key = (pageIndex, previousPageData) =>
    getKey(pageIndex, previousPageData, keywords);
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
  console.log(posts);
  return (
    <Container>
      <Head
        title={`${keywords} - Ambis Kuliah`}
        description={`Cari diskusi yang mengandung kata kunci ${keywords}`}
      />
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
                description={post.contents}
                image={post.image}
                topics={post.topics}
                voteStats={post.stats.upvotes - post.stats.downvotes}
                replyStats={post.stats.replies}
                timestamp={post.timestamp}
                replyTo={post.replyTo}
                authorFullname={post.author.fullname}
                authorUsername={post.author.username}
                authorAvatar={post.author.avatar}
                isUpvote={post?.interactions?.upvote}
                isDownvote={post?.interactions?.downvote}
                handleUpvote={() => handleUpvote(post.id)}
                handleDownvote={() => handleDownvote(post.id)}
                handleDelete={() => handleDelete(post.id)}
                hasAuth={userData?.username === post.author.username}
              />
            ))
          : null}
        {!posts.length ? (
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

export default Search;
