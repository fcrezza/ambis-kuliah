import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useSWRInfinite} from 'swr';
import {Button} from 'components/Button';

import Post from 'components/Post';
import axios from 'utils/axios';
import {useAuth} from 'utils/auth';
import {upvotePost, downvotePost, deletePost} from 'utils/common/post';

function getKey(pageIndex, previousPageData, postContext) {
  if (!Object.keys(postContext).length) {
    return null;
  }

  // change this offset
  const startOffset = 2 * pageIndex + 1;
  const endOffset = startOffset + 1;

  if (previousPageData && !previousPageData.length) {
    return null;
  }

  return `/posts/${postContext.authorUsername}/${postContext.postId}/replies?limit=${startOffset},${endOffset}`;
}

function ReplyDiscussion({postId, authorUsername}) {
  const {userData} = useAuth();
  let hasMore = true;
  const key = (pageIndex, previousPageData) =>
    getKey(pageIndex, previousPageData, {postId, authorUsername});
  const {data, error, mutate, isValidating, setSize} = useSWRInfinite(
    key,
    url => axios.get(url).then(({data}) => data.data)
  );
  const replies = Array.isArray(data) ? [].concat(...data) : [];

  if ((Array.isArray(data) && !data[data.length - 1].length) || error) {
    hasMore = false;
  } else {
    hasMore = true;
  }

  const handleUpvote = postId => {
    if (!Object.keys(userData).length) {
      console.log('youre not login');
      return;
    }
    mutate(prevData => upvotePost(postId, userData.id, prevData.flat()), false);
  };

  const handleDownvote = postId => {
    if (!Object.keys(userData).length) {
      console.log('youre not login');
      return;
    }

    mutate(
      prevData => downvotePost(postId, userData.id, prevData.flat()),
      false
    );
  };

  const handleDelete = postId => {
    try {
      mutate(
        prevData => deletePost(postId, userData.username, prevData.flat()),
        false
      );
    } catch (e) {
      alert('upzzz ada yang tidak beres, coba lagi');
    }
  };

  return (
    <InfiniteScroll
      dataLength={replies.length}
      next={() => setSize(size => size + 1)}
      hasMore={isValidating || hasMore}
      loader={<p style={{textAlign: 'center'}}>Memuat lebih banyak...</p>}
      scrollThreshold="0px"
    >
      {replies.map(post => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          description={post.contents}
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
      ))}
      {error && !isValidating && (
        <div style={{textAlign: 'center'}}>
          <h2 style={{padding: '2rem'}}>Tidak dapat memuat data</h2>
          <Button onClick={() => mutate()}>Coba lagi</Button>
        </div>
      )}
    </InfiniteScroll>
  );
}
export default ReplyDiscussion;
