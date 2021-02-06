import styled from 'styled-components';

import {useSWRInfinite} from 'swr';
import InfiniteScroll from 'react-infinite-scroll-component';
import {toast} from 'react-hot-toast';

import Post from 'components/Post';
import axios from 'utils/axios';
import {Button} from 'components/Button';
import {useAuth} from 'utils/auth';
import {upvotePost, downvotePost, deletePost} from 'utils/common/post';
import Spinner from 'components/Spinner';

const PostsContainer = styled.div`
  margin-top: 2.5rem;
  background: ${({theme}) => theme.colors['white.50']};
  border: 1px solid ${({theme}) => theme.colors['gray.100']};
  border-radius: 10px 10px 0 0;
  overflow: hidden;
  min-height: calc(100vh - 460px);
  padding-bottom: 5rem;
`;

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
  padding-top: 2rem;
  display: flex;
  justify-content: center;
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
  const fetchOptions = {
    withCredentials: true
  };
  return axios.get(url, fetchOptions).then(({data}) => data.data);
}

function getKey(pageIndex, previousPageData, topics) {
  if (!topics) {
    return null;
  }

  // change this offset
  const startOffset = 20 * pageIndex + 1;
  const endOffset = 20;

  if (previousPageData && !previousPageData.length) {
    return null;
  }

  return `/posts?topics=${topics}&limit=${startOffset},${endOffset}`;
}

function Posts() {
  const {userData} = useAuth();
  const topics = userData.topics.map(topic => topic.name).join(',');
  const key = (pageIndex, previousPageData) =>
    getKey(pageIndex, previousPageData, topics);
  const {data, error, mutate, isValidating, setSize} = useSWRInfinite(
    key,
    fetcher
  );
  let hasMore = true;
  const postData = Array.isArray(data) ? data.flat() : [];

  if ((Array.isArray(data) && !data[data.length - 1].length) || error) {
    hasMore = false;
  } else {
    hasMore = true;
  }

  const handleUpvote = postId => {
    mutate(prevData => upvotePost(postId, userData.id, prevData.flat()), false);
  };

  const handleDownvote = postId => {
    mutate(
      prevData => downvotePost(postId, userData.id, prevData.flat()),
      false
    );
  };

  const handleDelete = async postId => {
    try {
      await mutate(
        prevData => deletePost(postId, userData.username, prevData.flat()),
        false
      );
      toast.success('Berhasil menghapus postingan');
    } catch (error) {
      toast.error('Gagal menghapus postingan');
    }
  };

  return (
    <PostsContainer>
      <InfiniteScroll
        dataLength={postData.length}
        next={() => setSize(size => size + 1)}
        hasMore={isValidating || hasMore}
        loader={
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        }
        scrollThreshold="0px"
      >
        {Array.isArray(postData) && postData.length
          ? postData.map(post => (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                description={
                  post.contents && post.contents.length > 200
                    ? `${post.contents.substring(0, 200)}...`
                    : post.contents
                }
                topics={post.topics}
                image={post.images[0]?.url}
                voteStats={post.stats.upvotes - post.stats.downvotes}
                replyStats={post.stats.replies}
                timestamp={post.timestamp}
                authorFullname={post.author.fullname}
                authorUsername={post.author.username}
                authorAvatar={post.author.avatar.url}
                isUpvote={post?.feedback?.upvotes}
                isDownvote={post?.feedback?.downvotes}
                handleUpvote={() => handleUpvote(post.id)}
                handleDownvote={() => handleDownvote(post.id)}
                handleDelete={() => handleDelete(post.id)}
                hasAuth={post.author.username === userData?.username}
              />
            ))
          : null}
        {Array.isArray(postData) && !postData.length ? (
          <EmptyContainer>
            <EmptyText>Tidak ada apa-apa disini</EmptyText>
          </EmptyContainer>
        ) : null}
        {error && !isValidating && (
          <ErrorContainer>
            <ErrorMessage>Tidak dapat memuat data</ErrorMessage>
            <Button onClick={() => mutate()}>Coba lagi</Button>
          </ErrorContainer>
        )}
      </InfiniteScroll>
    </PostsContainer>
  );
}

export default Posts;
