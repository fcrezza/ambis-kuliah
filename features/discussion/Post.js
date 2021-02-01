import React from 'react';
import {useRouter} from 'next/router';
import useSWR from 'swr';

import Head from 'components/Head';
import Post from 'components/Post';
import {PostSkeleton} from 'components/Skeleton';
import {useUser} from 'utils/user';
import axios from 'utils/axios';
import {upvotePost, downvotePost} from 'utils/common/post';

function fetcher(url) {
  return axios.get(url).then(({data}) => data.data);
}

function PostDiscussion() {
  const {query} = useRouter();
  const {userData} = useUser();
  const key = Object.keys(query).length
    ? `/posts/${query.authorUsername}/${query.postId}`
    : null;
  const {data, error, mutate} = useSWR(key, fetcher);

  const handleUpvote = postId => {
    if (!Object.keys(userData).length) {
      console.log('youre not login');
      return;
    }
    mutate(prevData => upvotePost(postId, userData.id, prevData), false);
  };

  const handleDownvote = postId => {
    if (!Object.keys(userData).length) {
      console.log('youre not login');
      return;
    }

    mutate(prevData => downvotePost(postId, userData.id, prevData), false);
  };

  if (error?.response.status === 404) {
    return (
      <div style={{textAlign: 'center'}}>
        <h2>404</h2>
        <p>Data tidak ditemukan</p>
      </div>
    );
  }

  if (data) {
    console.log(data);
    return (
      <>
        <Head
          title={data.title}
          description={`Tulisan ${data.author.fullname}`}
        />
        <Post
          type="detail"
          id={data.id}
          title={data.title}
          description={data.contents}
          topics={data.topics}
          voteStats={data.stats.upvotes - data.stats.downvotes}
          replyStats={data.stats.replies}
          replyTo={data.replyTo}
          timestamp={data.timestamp}
          authorFullname={data.author.fullname}
          authorUsername={data.author.username}
          authorAvatar={data.author.avatar.url}
          isUpvote={data?.feedback?.upvotes}
          isDownvote={data?.feedback?.downvotes}
          handleUpvote={() => handleUpvote(data.id)}
          handleDownvote={() => handleDownvote(data.id)}
        />
      </>
    );
  }

  return <PostSkeleton uniqueKey="post-discussion-skeleton" />;
}

export default PostDiscussion;
