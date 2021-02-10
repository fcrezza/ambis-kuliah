import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useSWRInfinite} from 'swr';
import {Button} from 'components/Button';
import styled from 'styled-components';

import Post from 'components/Post';
import axios from 'utils/axios';
import {useAuth} from 'utils/auth';
import {upvotePost, downvotePost, deletePost} from 'utils/common/post';
import Spinner from 'components/Spinner';
import toast from 'react-hot-toast';

const TitleContainer = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
`;

const Title = styled.h2`
  color: ${({theme}) => theme.colors['black.100']};
  margin: 0;
  font-size: 1.5rem;
`;

const SpinnerContainer = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
`;

const EmptyContainer = styled.div`
  padding: 2rem 1.5rem;
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

function getKey(pageIndex, previousPageData, data) {
  const limit = 20;

  if (!Object.keys(data).length) return null;
  // reached the end
  if (previousPageData && !previousPageData.next) return null;
  // first page, we don't have `previousPageData`
  if (pageIndex === 0)
    return `/posts/${data.authorUsername}/${data.postId}/replies?limit=${limit}`;
  // add the cursor to the API endpoint
  const {searchParams} = new URL(previousPageData.next);
  return `posts/${data.authorUsername}/${data.postId}/replies?${searchParams}`;
}

function DiscussionReplies({totalReplies, postId, authorUsername}) {
  const {userData} = useAuth();
  const key = (pageIndex, previousPageData) =>
    getKey(pageIndex, previousPageData, {postId, authorUsername});
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

  let replies = [];

  if (Array.isArray(data)) {
    replies = data.map(({posts}) => posts).flat();
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
    <>
      <TitleContainer>
        <Title>Komentar ({totalReplies})</Title>
      </TitleContainer>
      <InfiniteScroll
        dataLength={replies.length}
        next={() => setSize(size => size + 1)}
        hasMore={(hasMore && !error) || isValidating}
        loader={
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        }
        scrollThreshold="10px"
      >
        {replies.length
          ? replies.map(reply => (
              <Post
                key={reply.id}
                id={reply.id}
                description={
                  reply.contents && reply.contents.length > 200
                    ? `${reply.contents.substring(0, 200)}...`
                    : reply.contents
                }
                replyTo={reply.replyTo}
                voteStats={reply.stats.upvotes - reply.stats.downvotes}
                replyStats={reply.stats.replies}
                timestamp={reply.timestamp}
                authorFullname={reply.author.fullname}
                authorUsername={reply.author.username}
                authorAvatar={reply.author.avatar}
                image={reply.image}
                isUpvote={reply?.interactions?.upvote}
                isDownvote={reply?.interactions?.downvote}
                handleUpvote={() => handleUpvote(reply.id)}
                handleDownvote={() => handleDownvote(reply.id)}
                handleDelete={() => handleDelete(reply.id)}
                hasAuth={reply.author.username === userData?.username}
              />
            ))
          : null}
        {!replies.length ? (
          <EmptyContainer>
            <EmptyText>Tidak ada komentar</EmptyText>
          </EmptyContainer>
        ) : null}
        {error && !isValidating && (
          <ErrorContainer>
            <ErrorMessage>Tidak dapat memuat data</ErrorMessage>
            <Button onClick={() => mutate(prevState => prevState, true)}>
              Coba Lagi
            </Button>
          </ErrorContainer>
        )}
      </InfiniteScroll>
    </>
  );
}
export default DiscussionReplies;
