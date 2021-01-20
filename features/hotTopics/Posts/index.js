import Post from 'components/Post';
import {TrendSkeleton} from 'components/Skeleton';

function HotTopicsPosts() {
  return (
    <PostsContainer>
      <TitleContainer>
        <Title>Diskusi Terhangat</Title>
        <TitleIcon />
      </TitleContainer>
      {hotDiscussions
        ? hotDiscussions.map((discussion, idx) => (
            <Post
              key={idx}
              postID={discussion.post.id}
              title={discussion.post.title}
              tags={discussion.post.tags}
              fullname={discussion.user.fullname}
              username={discussion.user.username}
              avatar={discussion.user.avatar}
            />
          ))
        : Array(3)
            .fill()
            .map((_, idx) => (
              <TrendSkeleton uniqueKey={`trend-skeleton-${idx}`} key={idx} />
            ))}
    </PostsContainer>
  );
}

export default HotTopicsPosts;
