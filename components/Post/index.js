import React from 'react';
import {formatDistanceToNow} from 'date-fns';
import {id} from 'date-fns/locale';
import {useRouter} from 'next/router';

import {Tag, TagGroup} from '../Tag';
import PostActionButton from './PostActionButtons';
import {
  PostReply,
  PostTitle,
  PostProfile,
  PostDescription,
  PostFooter,
  AnswerStats,
  Divider,
  TimeStamp
} from './PostContents';
import Link from 'next/link';
import PostActions from './PostActions';
import PostComment from './PostComment';
import {PostContainer, PostContentContainer} from './utils';

function Post(props) {
  const {
    postID,
    tags,
    title,
    text,
    stats,
    replyTo,
    timestamp,
    avatar,
    fullname,
    username,
    showControl,
    type
  } = props;

  const [reaction, setReaction] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const router = useRouter();

  const onReactPost = (reaction, e) => {
    e.stopPropagation();
    setReaction(reaction);
  };

  const onClickPost = (username, postID) => {
    router.push(`/discussion/${username}/${postID}`);
  };

  const onReplyClick = e => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <PostContainer
      tabIndex="0"
      onClick={type === 'detail' ? null : () => onClickPost(username, postID)}
      type={type}
    >
      {showControl ? (
        <PostActionButton
          reaction={reaction}
          onReactPost={onReactPost}
          voteStats={stats.upvotes - stats.downvotes}
        />
      ) : null}
      <PostComment
        postID={postID}
        postUsername={username}
        isModalOpen={isModalOpen}
        onModalClose={onModalClose}
      />
      <PostContentContainer>
        {replyTo ? <PostReply replyTo={replyTo} /> : null}
        {tags ? (
          <TagGroup>
            {tags.map((tag, idx) => (
              <Link key={idx} href={`/explore/${tag.name}`} passHref>
                <Tag onClick={e => e.stopPropagation()}>{tag.name}</Tag>
              </Link>
            ))}
          </TagGroup>
        ) : null}
        <PostActions postUsername={username} onReplyClick={onReplyClick} />
        {title ? <PostTitle>{title}</PostTitle> : null}
        {text ? (
          <PostDescription>{text.substring(0, 255)}...</PostDescription>
        ) : null}
        <PostFooter>
          <PostProfile
            href={`/profile/${username}`}
            avatar={avatar}
            name={fullname}
          />
          {typeof stats?.replies === 'number' ? (
            <>
              <Divider />
              <AnswerStats>{stats.replies} Jawaban</AnswerStats>
            </>
          ) : null}
          {timestamp ? (
            <>
              <Divider />
              <TimeStamp>
                {formatDistanceToNow(new Date(timestamp), {
                  includeSeconds: true,
                  locale: id
                })}{' '}
                yang lalu
              </TimeStamp>
            </>
          ) : null}
        </PostFooter>
      </PostContentContainer>
    </PostContainer>
  );
}

export default Post;
