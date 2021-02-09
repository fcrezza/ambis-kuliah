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
  position: relative;
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
  text-lign: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const EmptyText = styled.p`
  color: ${({theme}) => theme.colors['black.50']};
  margin: 0;
  font-size: 1rem;
  text-align: center;
  line-height: 30px;
`;

function getKey(pageIndex, previousPageData) {
  const limit = 3;

  // reached the end
  if (previousPageData && !previousPageData.next) return null;
  // first page, we don't have `previousPageData`
  if (pageIndex === 0) return `/posts/feeds?limit=${limit}`;
  // add the cursor to the API endpoint
  const {searchParams} = new URL(previousPageData.next);
  return `posts/feeds?${searchParams}`;
}

function Posts() {
  const {userData} = useAuth();
  const {data, error, mutate, isValidating, setSize} = useSWRInfinite(
    getKey,
    url => axios.get(url).then(({data}) => data.data)
  );

  let hasMore = false;

  if (Array.isArray(data) && !data[data.length - 1].next) {
    hasMore = false;
  } else if (data && data[data.length - 1].next) {
    hasMore = true;
  }

  let posts = [];

  if (Array.isArray(data)) {
    posts = data.map(({posts}) => posts).flat();
  }
  const handleUpvote = postId => {
    mutate(prevState => upvotePost(postId, userData.id, prevState), false);
  };

  const handleDownvote = postId => {
    mutate(prevState => downvotePost(postId, userData.id, prevState), false);
  };

  const handleDelete = async postId => {
    try {
      await mutate(
        prevState => deletePost(postId, userData.username, prevState),
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
        dataLength={posts.length}
        next={() => setSize(size => size + 1)}
        hasMore={hasMore && !error}
        loader={
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        }
        scrollThreshold="10px"
      >
        {posts.length
          ? posts.map(post => (
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
                image={post.image}
                voteStats={post.stats.upvotes - post.stats.downvotes}
                replyStats={post.stats.replies}
                timestamp={post.timestamp}
                authorFullname={post.author.fullname}
                authorUsername={post.author.username}
                authorAvatar={post.author.avatar}
                isUpvote={post?.interactions?.upvote}
                isDownvote={post?.interactions?.downvote}
                handleUpvote={() => handleUpvote(post.id)}
                handleDownvote={() => handleDownvote(post.id)}
                handleDelete={() => handleDelete(post.id)}
                hasAuth={post.author.username === userData?.username}
              />
            ))
          : null}
        {!posts.length ? (
          <EmptyContainer>
            <EmptyText>
              Postingan dari topik yang anda ikuti akan muncul disini
            </EmptyText>
          </EmptyContainer>
        ) : null}
        {error && !isValidating ? (
          <ErrorContainer>
            <ErrorMessage>Tidak dapat memuat data</ErrorMessage>
            <Button onClick={() => mutate(prevData => prevData, true)}>
              Coba lagi
            </Button>
          </ErrorContainer>
        ) : null}
      </InfiniteScroll>
    </PostsContainer>
  );
}

export default Posts;
