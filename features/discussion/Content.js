import {useRouter} from 'next/router';
import useSWR, {mutate} from 'swr';
import styled from 'styled-components';
import {ErrorBoundary, useErrorHandler} from 'react-error-boundary';
import {toast} from 'react-hot-toast';

import DiscussionReplies from './Replies';
import {useAuth} from 'utils/auth';
import axios from 'utils/axios';
import {upvotePost, downvotePost, deletePost} from 'utils/common/post';
import Head from 'components/Head';
import Post from 'components/Post';
import Spinner from 'components/Spinner';
import WriteReply from './WriteReply';
import {Button} from 'components/Button';

const ErrorContainer = styled.div`
  padding: 2rem;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: ${({theme}) => theme.colors['black.50']};
  font-size: 1rem;
  margin: 0 0 2rem;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const DiscussionPost = styled.div`
  background: ${({theme}) => theme.colors['white.50']};
  border: 1px solid ${({theme}) => theme.colors['gray.100']};
  border-radius: 10px;
  margin-bottom: 2.5rem;
`;

const DiscussionRepliesContainer = styled.div`
  background: ${({theme}) => theme.colors['white.50']};
  border: 1px solid ${({theme}) => theme.colors['gray.100']};
  border-radius: 10px;
  min-height: calc(100vh - 600px);
  padding: 0 0 5rem;
`;

function DiscussionContent() {
  const {userData} = useAuth();
  const {query, back} = useRouter();
  const key = Object.keys(query).length
    ? `/posts/${query.authorUsername}/${query.postId}`
    : null;
  const {data, error, mutate} = useSWR(key, url =>
    axios.get(url).then(({data}) => data.data)
  );
  useErrorHandler(!data && error);

  const isAuth = Object.keys(userData).length;

  const handleUpvote = () => {
    mutate(prevData => upvotePost(data.id, userData.id, prevData), false);
  };

  const handleDownvote = () => {
    mutate(prevData => downvotePost(data.id, userData.id, prevData), false);
  };

  const handleDelete = async () => {
    try {
      await mutate(deletePost(data.id, userData.username), false);
      toast.success('Berhasil menghapus postingan');
      back();
    } catch (e) {
      toast.error('Gagal menghapus postingan');
    }
  };

  return (
    <>
      <DiscussionPost>
        {!data ? (
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        ) : (
          <>
            <Head
              title={data.title}
              description={`Tulisan ${data.author.fullname}`}
            />
            <Post
              type="detail"
              id={data.id}
              title={data.title}
              description={
                data.contents && data.contents.length > 200
                  ? `${data.contents.substring(0, 200)}...`
                  : data.contents
              }
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
                postId={Number(data.id)}
                authorUsername={data.author.username}
              />
            ) : null}
          </>
        )}
      </DiscussionPost>
      <DiscussionRepliesContainer>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <DiscussionReplies
            postId={Number(query.postId)}
            authorUsername={query.authorUsername}
          />
        </ErrorBoundary>
      </DiscussionRepliesContainer>
    </>
  );
}

function ErrorFallback({error, resetErrorBoundary}) {
  const reset = async () => {
    await mutate(error.config.url, null, true);
    resetErrorBoundary();
    return;
  };

  if (error.request) {
    return (
      <ErrorContainer>
        <ErrorMessage>Upzzz, tidak dapat memuat data</ErrorMessage>
        <Button onClick={reset}>Coba Lagi</Button>
      </ErrorContainer>
    );
  }

  return (
    <ErrorContainer>
      <ErrorMessage>Upzzz, Ada yang salah</ErrorMessage>
      <Button onClick={resetErrorBoundary}>Coba Lagi</Button>
    </ErrorContainer>
  );
}

export default DiscussionContent;
