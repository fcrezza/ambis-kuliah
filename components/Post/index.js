import React from 'react';
import styled from 'styled-components';
import {lighten} from 'polished';

import {Tag, TagGroup} from '../Tag';
import usePost from './usePost';
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
  const {
    reaction,
    onClickPost,
    onReactPost,
    isModalOpen,
    onReplyClick,
    onModalClose
  } = usePost();

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
          voteStats={stats.upvote - stats.downvote}
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
              <Link key={idx} href={`/explore/${tag}`} passHref>
                <Tag onClick={e => e.stopPropagation()}>{tag}</Tag>
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
          {typeof stats?.answer === 'number' ? (
            <>
              <Divider />
              <AnswerStats>{stats.answer} Jawaban</AnswerStats>
            </>
          ) : null}
          {timestamp ? (
            <>
              <Divider />
              <TimeStamp>{timestamp}</TimeStamp>
            </>
          ) : null}
        </PostFooter>
      </PostContentContainer>
    </PostContainer>
  );
}

export default Post;
