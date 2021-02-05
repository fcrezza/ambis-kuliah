import React from 'react';
import {useSWRInfinite} from 'swr';
import InfiniteScroll from 'react-infinite-scroll-component';

import Post from 'components/Post';
import {Button} from 'components/Button';
import axios from 'utils/axios';
import {upvotePost, downvotePost, deletePost} from 'utils/common/post';
import {useAuth} from 'utils/auth';

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
  const startOffset = 20 * pageIndex || 1;
  const endOffset = 20;

  if (previousPageData && !previousPageData.length) {
    return null;
  }

  return `/posts/${username}?limit=${startOffset},${endOffset}`;
}

function ProfilePosts({username}) {
  const {userData} = useAuth();
  const key = (pageIndex, previousPageData) =>
    getKey(pageIndex, previousPageData, username);
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
      dataLength={postData.length}
      next={() => setSize(size => size + 1)}
      hasMore={isValidating || hasMore}
      loader={<p style={{textAlign: 'center'}}>Memuat lebih banyak...</p>}
      scrollThreshold="0px"
    >
      {postData.length ? (
        postData.map(post => (
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
            hasAuth={userData?.id === post.author.id}
          />
        ))
      ) : (
        <div style={{textAlign: 'center', padding: '2rem'}}>
          Tidak ada apa-apa disini
        </div>
      )}
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
