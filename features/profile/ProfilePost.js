import Post from 'components/Post';
import {PostSkeleton} from 'components/Skeleton';
import useProfilePost from './useProfilePost';

function ProfilePost({userID, userUsername, userFullname, userAvatar}) {
  const {userPosts} = useProfilePost(userID);

  return userPosts
    ? userPosts.map((post, idx) => (
        <Post
          key={idx}
          postID={post.id}
          title={post.title}
          text={post.text}
          tags={post.tags}
          stats={post.stats}
          timestamp={post.timestamp}
          fullname={userFullname}
          username={userUsername}
          avatar={userAvatar}
          showControl
        />
      ))
    : Array(3)
        .fill()
        .map((_, idx) => (
          <PostSkeleton uniqueKey={`post-skeleton-${idx}`} key={idx} />
        ));
}

export default ProfilePost;
