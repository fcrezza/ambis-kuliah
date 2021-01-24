import useSWR from 'swr';

import Post from 'components/Post';
import {Button} from 'components/Button';
import {PostSkeleton} from 'components/Skeleton';
import axios from 'utils/axios';

function ProfileReply({username}) {
  const {data: postsData, mutate, error} = useSWR(
    ['/posts', username],
    (url, arg) => {
      const combinedUrl = `${url}/${arg}`;
      const fetchOptions = {
        withCredentials: true
      };
      return axios.get(combinedUrl, fetchOptions).then(({data}) => data.data);
    }
  );

  /* display error message when can't fetch posts data */
  if (error) {
    return (
      <div>
        <h2>Tidak dapat memuat data</h2>
        <Button onClick={mutate}>Coba lagi</Button>
      </div>
    );
  }

  /* display posts */
  if (postsData?.length && !error) {
    return postsData.map(post => (
      <Post
        key={post.id}
        postID={post.id}
        title={post.title}
        text={post.contents}
        tags={post.topics}
        stats={post.stats}
        timestamp={post.timestamp}
        fullname={post.author.fullname}
        username={post.author.username}
        avatar={post.author.avatarUrl}
        showControl
      />
    ));
  }

  /* display message when there are no posts related to user topics */

  if (!postsData?.length && !error) {
    return <div>Tidak ada apa-apa disini</div>;
  }

  /* display loading skeleton when fetching the data */

  if (!postsData && !error) {
    <div>
      <PostSkeleton uniqueKey="post-skeleton-1" />
      <PostSkeleton uniqueKey="post-skeleton-2" />
      <PostSkeleton uniqueKey="post-skeleton-3" />
    </div>;
  }
}

export default ProfileReply;
