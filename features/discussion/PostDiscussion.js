import Head from 'components/Head';
import Post from 'components/Post';
import {PostSkeleton} from 'components/Skeleton';
import usePostDiscussion from './usePostDiscussion';

function PostDiscussion() {
  const {postDiscussion} = usePostDiscussion();

  if (postDiscussion) {
    return (
      <>
        <Head
          title={postDiscussion.title}
          description={`Tulisan ${postDiscussion.user.fullname}`}
        />
        <Post
          type="detail"
          postID={postDiscussion.post.id}
          title={postDiscussion.post.title}
          text={postDiscussion.post.text}
          tags={postDiscussion.post.tags}
          stats={postDiscussion.post.stats}
          replyTo={postDiscussion.post.replyTo}
          timestamp={postDiscussion.post.timestamp}
          fullname={postDiscussion.user.fullname}
          username={postDiscussion.user.username}
          avatar={postDiscussion.user.avatar}
          showControl
        />
      </>
    );
  }

  return <PostSkeleton uniqueKey="post-discussion-skeleton" />;
}

export default PostDiscussion;
