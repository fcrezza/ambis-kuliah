import React from 'react';
import styled from 'styled-components';
import {lighten} from 'polished';
import {formatDistanceToNow} from 'date-fns';
import {id as localeId} from 'date-fns/locale';
import {useRouter} from 'next/router';

import PostVote from './PostVote';
import PostContent from './PostContent';
import PostAuthor from './PostAuthor';
import PostOption from './PostOption';
import PostTopic from './PostTopic';
import PostReply from './PostReply';

const PostContainer = styled.div`
  padding: 1.5rem;
  display: flex;
  cursor: ${({type}) => (type !== 'detail' ? 'pointer' : 'default')};
  position: relative;

  &:focus,
  &:hover {
    background-color: ${({theme, type}) =>
      type !== 'detail' ? lighten(0.01, theme.colors['gray.50']) : null};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
  }
`;

const PostContentContainer = styled.div`
  & > *:not(:last-child) {
    margin-bottom: 1.3rem;
  }
`;

const AnswerStats = styled.p`
  font-size: 0.8rem;
  color: ${({theme}) => theme.colors['black.50']};
  white-space: nowrap;
`;

const TimeStamp = styled.p`
  font-size: 0.8rem;
  color: ${({theme}) => theme.colors['black.50']};
  white-space: nowrap;
`;

const Divider = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${({theme}) => theme.colors['black.50']};
`;

const PostFooter = styled.div`
  display: flex;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

function Post(props) {
  const {
    type,
    hasAuth,
    id,
    topics,
    title,
    description,
    image,
    voteStats,
    replyStats,
    replyTo,
    timestamp,
    authorAvatar,
    authorFullname,
    authorUsername,
    isDownvote,
    isUpvote,
    handleUpvote,
    handleDownvote,
    handleDelete
  } = props;

  const router = useRouter();
  const readableTimestamp = formatDistanceToNow(new Date(timestamp), {
    includeSeconds: true,
    locale: localeId
  });

  const onClickPost = (authorUsername, postId) => {
    router.push(`/discussion/${authorUsername}/${postId}`);
  };

  return (
    <PostContainer
      tabIndex="0"
      onClick={type === 'detail' ? null : () => onClickPost(authorUsername, id)}
      type={type}
    >
      <PostVote
        isUpvote={isUpvote}
        isDownvote={isDownvote}
        handleUpvote={handleUpvote}
        handleDownvote={handleDownvote}
        voteStats={voteStats}
      />
      <PostContentContainer>
        {replyTo ? <PostReply replyTo={replyTo} /> : null}
        {topics ? <PostTopic topics={topics} /> : null}
        <PostOption
          authorUsername={authorUsername}
          postId={id}
          hasAuth={hasAuth}
          handleDelete={handleDelete}
        />
        <PostContent title={title} description={description} image={image} />
        <PostFooter>
          <PostAuthor
            avatar={authorAvatar}
            fullname={authorFullname}
            username={authorUsername}
          />
          <Divider />
          <AnswerStats>{replyStats} Jawaban</AnswerStats>
          <Divider />
          <TimeStamp>{readableTimestamp} yang lalu</TimeStamp>
        </PostFooter>
      </PostContentContainer>
    </PostContainer>
  );
}

export default Post;
