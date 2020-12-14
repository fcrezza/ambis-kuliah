import Post from 'components/Post';

import {PostSkeleton} from 'components/Skeleton';
import useProfileReply from './useProfileReply';

function ProfileReply({userID, userUsername, userFullname, userAvatar}) {
  const {userReplies} = useProfileReply(userID);

  return userReplies
    ? userReplies.map((reply, idx) => (
        <Post
          key={idx}
          postID={reply.id}
          text={reply.text}
          stats={reply.stats}
          timestamp={reply.timestamp}
          replyTo={reply.replyTo}
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

export default ProfileReply;
