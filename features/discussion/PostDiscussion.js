import React from 'react';
import {useRouter} from 'next/router';
import useSWR from 'swr';

import Head from 'components/Head';
import Post from 'components/Post';
import {PostSkeleton} from 'components/Skeleton';
import axios from 'utils/axios';

function fetcher(url) {
  return axios.get(url).then(({data}) => data.data);
}

function PostDiscussion() {
  const router = useRouter();
  const key =
    'id' in router.query
      ? `/posts/${router.query.id[0]}/${router.query.id[1]}`
      : null;
  const {data, error} = useSWR(key, fetcher);

  if (error?.response.status === 404) {
    return (
      <div style={{textAlign: 'center'}}>
        <h2>404</h2>
        <p>Data tidak ditemukan</p>
      </div>
    );
  }

  if (data) {
    return (
      <>
        <Head
          title={data.title}
          description={`Tulisan ${data.author.fullname}`}
        />
        <Post
          type="detail"
          postID={data.id}
          title={data.title}
          text={data.contents}
          tags={data.topics}
          stats={data.stats}
          replyTo={data.replyTo}
          timestamp={data.timestamp}
          fullname={data.author.fullname}
          username={data.author.username}
          avatar={data.author.avatarUrl}
          showControl
        />
      </>
    );
  }

  return <PostSkeleton uniqueKey="post-discussion-skeleton" />;
}

export default PostDiscussion;
