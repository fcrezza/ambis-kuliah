import React from 'react';
import styled from 'styled-components';
import {RiArrowUpSFill, RiArrowDownSFill} from 'react-icons/ri';

import {Tag, TagGroup} from './Tag';

const PostContainer = styled.div`
  padding: 1.5rem;
  display: flex;

  &:not(:last-child) {
    border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
  }
`;

const PostTitle = styled.a`
  color: ${({theme}) => theme.colors['black.150']};
  font-size: 1.3rem;
  line-height: 30px;
  text-decoration: none;
  cursor: pointer;
  font-weight: 700;
  display: inline-block;

  &:focus,
  &:hover {
    text-decoration: underline;
  }
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

const PostPreviewText = styled.p`
  line-height: 30px;
  color: ${({theme}) => theme.colors['black.100']};
  font-size: 1rem;
  margin: 0;
`;

const AnswerStat = styled.p`
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

function Post({data, showControl}) {
  const {tags, avatar, title, name, text = '', stats = null} = data;
  const [like, setLike] = React.useState(false);
  const [dislike, setDislike] = React.useState(false);

  const onLike = () => {
    if (dislike) {
      setDislike(prevState => !prevState);
    }

    setLike(prevState => !prevState);
  };

  const onDislike = () => {
    if (like) {
      setLike(prevState => !prevState);
    }

    setDislike(prevState => !prevState);
  };

  return (
    <PostContainer>
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
        <TagGroup>
          {tags.map((tag, idx) => (
            <Tag key={idx} href={`#${tag}`}>
              {tag}
            </Tag>
          ))}
        </TagGroup>
        <PostTitle href="/discussions">{title}</PostTitle>
        {text ? (
          <PostPreviewText>{text.substring(0, 255)}...</PostPreviewText>
        ) : null}
        <PostFooter>
          <PostProfile href="/profile/">
            <img
              src={avatar}
              alt={`${name} avatar`}
              className="profile-image"
            />
            <p className="profile-name">{name}</p>
          </PostProfile>
          {stats?.answer ? (
            <>
              <Divider />
              <AnswerStat>{stats.answer} Jawaban</AnswerStat>
            </>
          ) : null}
        </PostFooter>
      </PostContent>
    </PostContainer>
  );
}

export default Post;
