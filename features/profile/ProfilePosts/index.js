import React from 'react';
import {useSWRInfinite} from 'swr';
import InfiniteScroll from 'react-infinite-scroll-component';

import Post from 'components/Post';
import {Button} from 'components/Button';
import axios from 'utils/axios';
import {upvotePost, downvotePost} from 'utils/common/vote';
import {useUser} from 'utils/user';

function fetcher(url) {
  const fetchOptions = {
    withCredentials: true
  };
  return axios.get(url, fetchOptions).then(({data}) => data.data);
}

function getKey(pageIndex, previousPageData, username) {
  if (!username) {
    return null;
  }

  // change this offset
  const startOffset = 2 * pageIndex + 1;
  const endOffset = startOffset + 1;

  if (previousPageData && !previousPageData.length) {
    return null;
  }

  return `/posts/${username}?limit=${startOffset},${endOffset}`;
}

function ProfilePosts({username}) {
  const {userData} = useUser();
  const key = (pageIndex, previousPageData) =>
    getKey(pageIndex, previousPageData, username);
  const {data, error, mutate, isValidating, setSize} = useSWRInfinite(
    key,
    fetcher
  );
  let hasMore = true;
  const postData = Array.isArray(data) ? data.flat() : [];

  if ((Array.isArray(data) && !data[data.length - 1].length) || error) {
    hasMore = false;
  } else {
    hasMore = true;
  }
  const onUpvote = postId => {
    if (!Object.keys(userData).length) {
      console.log('youre not login');
      return;
    }
    mutate(prevData => upvotePost(postId, userData.id, prevData), false);
  };

  const onDownvote = postId => {
    if (!Object.keys(userData).length) {
      console.log('youre not login');
      return;
    }

    mutate(prevData => downvotePost(postId, userData.id, prevData), false);
  };

  return (
    <InfiniteScroll
      dataLength={postData.length}
      next={() => setSize(size => size + 1)}
      hasMore={isValidating || hasMore}
      loader={<p style={{textAlign: 'center'}}>Memuat lebih banyak...</p>}
      scrollThreshold="0px"
    >
      {postData.map(post => (
        <Post
          key={post.id}
          postID={post.id}
          title={post.title}
          text={post.contents}
          tags={post.topics}
          stats={post.stats.upvotes - post.stats.downvotes}
          timestamp={post.timestamp}
          fullname={post.author.fullname}
          username={post.author.username}
          avatar={post.author.avatar.url}
          isUpvote={post?.feedback?.upvotes}
          isDownvote={post?.feedback?.downvotes}
          onUpvote={() => onUpvote(post.id)}
          onDownvote={() => onDownvote(post.id)}
          showControl
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

export default ProfilePosts;
