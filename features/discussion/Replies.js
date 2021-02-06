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

function getKey(pageIndex, previousPageData, postContext) {
  if (!Object.keys(postContext).length) {
    return null;
  }

  // change this offset
  const startOffset = 20 * pageIndex + 1;
  const endOffset = 20;

  if (previousPageData && !previousPageData.length) {
    return null;
  }

  return `/posts/${postContext.authorUsername}/${postContext.postId}/replies?limit=${startOffset},${endOffset}`;
}

function DiscussionReplies({postId, authorUsername}) {
  const {userData} = useAuth();
  let hasMore = true;
  const key = (pageIndex, previousPageData) =>
    getKey(pageIndex, previousPageData, {postId, authorUsername});
  const {data, error, mutate, isValidating, setSize} = useSWRInfinite(
    key,
    url => axios.get(url).then(({data}) => data.data)
  );
  const replies = Array.isArray(data) ? [].concat(...data) : [];

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
      console.log(data);
      toast.success('Berhasil menghapus komentar');
    } catch (e) {
      toast.error('Gagal menghapus komentar');
    }
  };

  return (
    <>
      <TitleContainer>
        <Title>Komentar ({replies.length})</Title>
      </TitleContainer>
      <InfiniteScroll
        dataLength={replies.length}
        next={() => setSize(size => size + 1)}
        hasMore={isValidating || hasMore}
        loader={
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        }
        scrollThreshold="0px"
      >
        {Array.isArray(replies) && replies.length
          ? replies.map(post => (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                description={
                  post.contents && post.contents.length > 200
                    ? `${post.contents.substring(0, 200)}...`
                    : post.contents
                }
                replyTo={post.replyTo}
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
                hasAuth={post.author.username === userData?.username}
              />
            ))
          : null}
        {Array.isArray(replies) && !replies.length ? (
          <EmptyContainer>
            <EmptyText>Tidak ada komentar</EmptyText>
          </EmptyContainer>
        ) : null}
        {error && !isValidating && (
          <ErrorContainer>
            <ErrorMessage>Tidak dapat memuat data</ErrorMessage>
            <Button onClick={() => mutate()}>Coba Lagi</Button>
          </ErrorContainer>
        )}
      </InfiniteScroll>
    </>
  );
}
export default DiscussionReplies;
