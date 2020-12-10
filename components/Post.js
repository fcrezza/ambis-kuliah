import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import {RiArrowUpSFill, RiArrowDownSFill} from 'react-icons/ri';
import {lighten} from 'polished';

import {Tag, TagGroup} from './Tag';

const PostContainer = styled.div`
  padding: 1.5rem;
  display: flex;
  cursor: ${({type}) => (type !== 'detail' ? 'pointer' : 'default')};

  &:focus,
  &:hover {
    background-color: ${({theme, type}) =>
      type !== 'detail' ? lighten(0.01, theme.colors['gray.50']) : null};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
  }
`;

const PostTitle = styled.h2`
  color: ${({theme}) => theme.colors['black.150']};
  font-size: 1.3rem;
  line-height: 30px;
  font-weight: 700;
  display: inline-block;
  margin: 0;
`;

const PostProfile = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;

  .profile-image {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  .profile-name {
    font-size: 0.8rem;
    margin: 0 0 0 0.5rem;
    color: ${({theme}) => theme.colors['black.50']};
    white-space: nowrap;
  }

  &:hover,
  &:focus {
    .profile-name {
      text-decoration: underline;
    }
  }
`;

const PostControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 2rem;
  width: 30px;

  .text-stats {
    font-size: 1.3rem;
    font-weight: 700;
    color: ${({theme}) => theme.colors['black.150']};
    display: inline-block;
    margin: 5px 0;
  }
`;

const PostContent = styled.div`
  & > *:not(:last-child) {
    margin-bottom: 1.3rem;
  }
`;

const PostFooter = styled.div`
  display: flex;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const Divider = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${({theme}) => theme.colors['black.50']};
`;

const PostDescription = styled.p`
  line-height: 30px;
  color: ${({theme}) => theme.colors['black.100']};
  font-size: 1rem;
  margin: 0;
`;

const ReplyTo = styled.p`
  font-size: 0.9rem;
  color: ${({theme}) => theme.colors['black.50']};
  margin: 0;

  a {
    text-decoration: none;
    color: ${({theme}) => theme.colors['orange.50']};

    &:focus,
    &:hover {
      text-decoration: underline;
    }
  }
`;

const AnswerStat = styled.p`
  font-size: 0.8rem;
  color: ${({theme}) => theme.colors['black.50']};
  white-space: nowrap;
`;

const TimeStamp = styled.p`
  font-size: 0.8rem;
  color: ${({theme}) => theme.colors['black.50']};
  white-space: nowrap;
`;

const ControlButton = styled.button`
  border: 0;
  background: none;
  padding: 0;
  cursor: pointer;

  svg {
    font-size: 2.5rem;
    color: ${({theme, isTruth}) =>
      isTruth ? theme.colors['orange.50'] : theme.colors['black.150']};
    display: block;
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
    ...rest
  } = props;
  const [like, setLike] = React.useState(false);
  const [dislike, setDislike] = React.useState(false);
  const router = useRouter();

  const onLike = e => {
    e.stopPropagation();

    if (dislike) {
      setDislike(prevState => !prevState);
    }

    setLike(prevState => !prevState);
  };

  const onDislike = e => {
    e.stopPropagation();
    if (like) {
      setLike(prevState => !prevState);
    }

    setDislike(prevState => !prevState);
  };

  const onClickPost = () => {
    router.push(`/discussion/${username}/${postID}`);
  };

  return (
    <PostContainer tabIndex="0" onClick={onClickPost} {...rest}>
      {showControl ? (
        <PostControl>
          <ControlButton onClick={onLike} isTruth={like}>
            <RiArrowUpSFill />
          </ControlButton>
          <span className="text-stats">{stats.like}</span>
          <ControlButton onClick={onDislike} isTruth={dislike}>
            <RiArrowDownSFill />
          </ControlButton>
        </PostControl>
      ) : null}
      <PostContent>
        {replyTo ? (
          <ReplyTo>
            Membalas kepada
            <Link href="/discussion/crispetersen"> @crispetersen</Link>
          </ReplyTo>
        ) : null}
        {tags ? (
          <TagGroup>
            {tags.map((tag, idx) => (
              <Tag key={idx} href={`#${tag}`}>
                {tag}
              </Tag>
            ))}
          </TagGroup>
        ) : null}
        {title ? <PostTitle href="/discussions">{title}</PostTitle> : null}
        {text ? (
          <PostDescription>{text.substring(0, 255)}...</PostDescription>
        ) : null}
        <PostFooter>
          <PostProfile href={`/profile/${username}`}>
            <img
              src={avatar}
              alt={`${name} avatar`}
              className="profile-image"
            />
            <p className="profile-name">{fullname}</p>
          </PostProfile>
          {typeof stats?.answer === 'number' ? (
            <>
              <Divider />
              <AnswerStat>{stats.answer} Jawaban</AnswerStat>
            </>
          ) : null}
          {timestamp ? (
            <>
              <Divider />
              <TimeStamp>{timestamp}</TimeStamp>
            </>
          ) : null}
        </PostFooter>
      </PostContent>
    </PostContainer>
  );
}

export default Post;
