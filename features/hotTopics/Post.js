import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import useSWR from 'swr';
import {useErrorHandler} from 'react-error-boundary';
import {formatDistanceToNow} from 'date-fns';
import {id as localeId} from 'date-fns/locale';
import {useRouter} from 'next/router';
import {lighten} from 'polished';

import Spinner from 'components/Spinner';
import axios from 'utils/axios';

const PostItem = styled.div`
  padding: 1.2rem;
`;

const PostContainer = styled.div`
  cursor: pointer;

  & > ${PostItem}:not(:last-child) {
    border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
  }

  &:hover,
  &:focus {
    background-color: ${({theme}) => lighten(0.01, theme.colors['gray.50'])};
  }
`;

const PostTimestamp = styled.p`
  color: ${({theme}) => theme.colors['black.50']};
  margin: 0;
  font-size: 0.9rem;
`;

const PostTitle = styled.h3`
  color: ${({theme}) => theme.colors['black.100']};
  margin: 0 0 1.5rem;
  font-size: 1.4rem;
  line-height: 35px;
`;

const AuthorNameContainer = styled.div`
  margin-left: 1rem;
`;

const AuthorFullname = styled.p`
  margin: 0 0 8px;
  font-size: 0.9rem;
  color: ${({theme}) => theme.colors['black.50']};
  font-weight: 700;
`;

const Divider = styled.div`
  margin: 0 8px;
  background: ${({theme}) => theme.colors['black.50']};
  width: 3px;
  height: 3px;
`;

const AuthorUsername = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: ${({theme}) => theme.colors['black.50']};
`;

const AuthorAvatar = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: ${({theme}) => theme.colors['gray.150']};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${({imageUrl}) => imageUrl});
`;

const AuthorLink = styled.a`
  text-decoration: none;
  display: inline-block;

  &:hover,
  &:focus {
    ${AuthorFullname}, ${AuthorUsername} {
      text-decoration: underline;
    }
  }
`;

const AuthorLinkContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PostTopContainer = styled.div`
  margin-bottom: 12px;
  display: flex;
  align-items: center;
`;

const PostTopicLink = styled.a`
  color: ${({theme}) => theme.colors['black.50']};
  text-decoration: none;
  font-size: 0.85rem;

  &:hover,
  &focus {
    text-decoration: underline;
  }
`;

const SpinnerContainer = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmptyContainer = styled.div`
  padding: 2rem 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmptyText = styled.p`
  color: ${({theme}) => theme.colors['black.50']};
  margin: 0;
  font-size: 1rem;
  text-align: center;
  line-height: 30px;
`;

function fetcher(url) {
  return axios.get(url).then(({data}) => data.data);
}

const url = '/posts/trending';

function Posts() {
  const {push} = useRouter();
  const {data: posts, error} = useSWR(url, fetcher);
  const isError = error && !Array.isArray(posts);
  useErrorHandler(isError ? error : null);

  if (!Array.isArray(posts)) {
    return (
      <SpinnerContainer>
        <Spinner />;
      </SpinnerContainer>
    );
  }

  if (Array.isArray(posts) && !posts.length) {
    return (
      <EmptyContainer>
        <EmptyText>Diskusi terhangat akan muncul disini</EmptyText>
      </EmptyContainer>
    );
  }

  const navigate = (postId, authorUsername) => {
    push(`/discussion/${authorUsername}/${postId}`);
  };

  return posts.map(post => (
    <Post
      key={post.id}
      title={post.title}
      topics={post.topics}
      authorUsername={post.author.username}
      authorFullname={post.author.fullname}
      authorAvatar={post.author.avatar.url}
      timestamp={post.timestamp}
      handleClickPost={() => navigate(post.id, post.author.username)}
      handleKeyDownPost={() => navigate(post.id, post.author.username)}
    />
  ));
}

function Post(props) {
  const {
    title,
    topics,
    authorUsername,
    authorFullname,
    authorAvatar,
    timestamp,
    handleClickPost,
    handleKeyDownPost
  } = props;
  const postContainerRef = React.useRef();

  const readableTimestamp = formatDistanceToNow(new Date(timestamp), {
    includeSeconds: true,
    locale: localeId
  });

  const onClick = () => {
    handleClickPost();
  };

  const onKeyDown = e => {
    if (e.target === postContainerRef.current && e.keyCode === 13) {
      handleKeyDownPost();
    }
  };

  return (
    <PostContainer
      tabIndex="0"
      role="button"
      ref={e => (postContainerRef.current = e)}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <PostItem>
        <PostTopContainer>
          {topics.map((topic, idx) => (
            <Link key={topic.id} href={`/explore/${topic.name}`} passHref>
              <PostTopicLink>
                {idx + 1 < topics.length ? `${topic.name}, ` : topic.name}
              </PostTopicLink>
            </Link>
          ))}
          <Divider />
          <PostTimestamp>{readableTimestamp}</PostTimestamp>
        </PostTopContainer>
        <PostTitle>{title}</PostTitle>
        <Link href={`/profile/${authorUsername}`} passHref>
          <AuthorLink>
            <AuthorLinkContainer>
              <AuthorAvatar imageUrl={authorAvatar} />
              <AuthorNameContainer>
                <AuthorFullname>{authorFullname}</AuthorFullname>
                <AuthorUsername>@{authorUsername}</AuthorUsername>
              </AuthorNameContainer>
            </AuthorLinkContainer>
          </AuthorLink>
        </Link>
      </PostItem>
    </PostContainer>
  );
}

export default Posts;
