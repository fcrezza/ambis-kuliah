import Post from 'components/Post';
import {PostSkeleton} from 'components/Skeleton';
import useReplyDiscussion from './useReplyDiscussion';

function ReplyDiscussion() {
  const {replyDiscussions} = useReplyDiscussion();

  if (replyDiscussions) {
    return replyDiscussions.map(reply => (
      <Post
        key={reply.id}
        postID={reply.id}
        text={reply.text}
        stats={reply.stats}
        replyTo={reply.replyTo}
        timestamp={reply.timestamp}
        fullname={reply.user.fullname}
        username={reply.user.username}
        avatar={reply.user.avatar}
        showControl
      />
    ));
  }

  return Array(3)
    .fill()
    .map((_, idx) => (
      <PostSkeleton key={idx} uniqueKey={`reply-discussion-${idx}`} />
    ));
}

export default ReplyDiscussion;
