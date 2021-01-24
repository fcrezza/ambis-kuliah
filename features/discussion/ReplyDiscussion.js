import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useRouter} from 'next/router';
import {useSWRInfinite} from 'swr';
import {Button} from 'components/Button';

import Post from 'components/Post';
import axios from 'utils/axios';

function fetcher(url) {
  return axios.get(url).then(({data}) => data.data);
}

function getKey(pageIndex, previousPageData, query) {
  if (!query) {
    return null;
  }

  // change this offset
  const startOffset = 2 * pageIndex + 1;
  const endOffset = startOffset + 1;

  if (previousPageData && !previousPageData.length) {
    return null;
  }

  return `/posts/${query.id[0]}/${query.id[1]}/replies?limit=${startOffset},${endOffset}`;
}

function ReplyDiscussion() {
  const router = useRouter();
  let hasMore = true;
  const key = (pageIndex, previousPageData) =>
    getKey(pageIndex, previousPageData, router.query);
  const {data, error, mutate, isValidating, setSize} = useSWRInfinite(
    key,
    fetcher
  );
  const replies = Array.isArray(data) ? [].concat(...data) : [];

  if ((Array.isArray(data) && !data[data.length - 1].length) || error) {
    hasMore = false;
  } else {
    hasMore = true;
  }

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
          postID={post.id}
          title={post.title}
          text={post.contents}
          replyTo={post.replyTo}
          tags={post.topics}
          stats={post.stats}
          timestamp={post.timestamp}
          fullname={post.author.fullname}
          username={post.author.username}
          avatar={post.author.avatarUrl}
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
export default ReplyDiscussion;
