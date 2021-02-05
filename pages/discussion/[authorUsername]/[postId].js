import React from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import useSWR from 'swr';

import Head from 'components/Head';
import Post from 'components/Post';
import {useAuth} from 'utils/auth';
import axios from 'utils/axios';
import {upvotePost, downvotePost, deletePost} from 'utils/common/post';
import {ReplyDiscussion, WriteReply} from 'features/discussion';
import Spinner from 'components/Spinner';

const DiscussionContainer = styled.main`
  flex: 1;
  position: relative;
  border-radius: 5px;
  border-width: 1px 1px 0;
  border-style: solid solid none;
  border-color: ${({theme}) => theme.colors['gray.100']};
  min-height: calc(100vh - 170px);

  @media screen and (max-width: 768px) {
    border: 0;
  }
`;

const TitleContainer = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleText = styled.h1`
  color: ${({theme}) => theme.colors['black.150']};
  margin: 0;
  font-size: 1.6rem;
`;

function Discussion() {
  const {userData} = useAuth();
  const {query, back} = useRouter();
  const key = Object.keys(query).length
    ? `/posts/${query.authorUsername}/${query.postId}`
    : null;
  const {data, error, mutate} = useSWR(key, url =>
    axios.get(url).then(({data}) => data.data)
  );
  const isAuth = Object.keys(userData).length;

  const handleUpvote = () => {
    if (!isAuth) {
      console.log('youre not login');
      return;
    }
    mutate(prevData => upvotePost(data.id, userData.id, prevData), false);
  };

  const handleDownvote = () => {
    if (!isAuth) {
      console.log('youre not login');
      return;
    }

    mutate(prevData => downvotePost(data.id, userData.id, prevData), false);
  };

  const handleDelete = () => {
    try {
      mutate(deletePost(data.id, userData.username), false);
      back();
    } catch (e) {
      alert('upzzz ada yang tidak beres, coba lagi');
    }
  };

  if (error?.response.status === 404) {
    return (
      <DiscussionContainer>
        <Head title="404 Not Found" description="Data tidak ditemukan" />
        <TitleContainer>
          <TitleText>Diskusi</TitleText>
        </TitleContainer>
        <div
          style={{
            textAlign: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <h2>404</h2>
          <p>Data tidak ditemukan</p>
        </div>
      </DiscussionContainer>
    );
  }

  if (data) {
    return (
      <DiscussionContainer>
        <Head
          title={data.title}
          description={`Tulisan ${data.author.fullname}`}
        />
        <TitleContainer>
          <TitleText>Diskusi</TitleText>
        </TitleContainer>
        <Post
          type="detail"
          id={data.id}
          title={data.title}
          description={data.contents}
          topics={data.topics}
          voteStats={data.stats.upvotes - data.stats.downvotes}
          replyStats={data.stats.replies}
          replyTo={data.replyTo}
          timestamp={data.timestamp}
          authorFullname={data.author.fullname}
          authorUsername={data.author.username}
          authorAvatar={data.author.avatar.url}
          isUpvote={data?.feedback?.upvotes}
          isDownvote={data?.feedback?.downvotes}
          handleUpvote={handleUpvote}
          handleDownvote={handleDownvote}
          handleDelete={handleDelete}
          hasAuth={data.author.username === userData?.username}
        />
        {isAuth ? (
          <WriteReply
            postId={Number(query.postId)}
            authorUsername={data.author.username}
          />
        ) : null}
        <ReplyDiscussion
          postId={Number(query.postId)}
          authorUsername={query.authorUsername}
        />
      </DiscussionContainer>
    );
  }

  return <Spinner />;
}

export default Discussion;
