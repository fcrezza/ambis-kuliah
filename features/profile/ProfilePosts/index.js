import React from 'react';
import {useSWRInfinite} from 'swr';
import {throttle} from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';

import Post from 'components/Post';
import {Button} from 'components/Button';
import axios from 'utils/axios';

// function ProfilePost({username}) {
//   const key = username
//     ? (pageIndex, previousPageData) =>
//         getKey(pageIndex, previousPageData, username)
//     : null;
//   const {data, mutate, error, isValidating, size, setSize} = useSWRInfinite(
//     key,
//     fetcher
//   );
//   const postData = data ? [].concat(...data) : [];
//   // console.log('postData: ', postData);
//   React.useEffect(() => {
//     const scrollHandler = throttle(() => {
//       if (
//         window.innerHeight + document.documentElement.scrollTop ===
//         document.documentElement.offsetHeight
//       ) {
//         if (!isValidating) {
//           console.log(
//             '%ccalled',
//             'background-color: green;color: #fff; padding: 4rem; font-size: 3rem;'
//           );
//           setSize(size + 1);
//         }
//       }
//     }, 100);

//     window.addEventListener('scroll', scrollHandler);

//     return () => {
//       window.removeEventListener('scroll', scrollHandler);
//     };
//   }, []);

//   console.log('isValidating', isValidating);

//   return (
//     <div>
//       {!isValidating && !postData?.length && !error ? (
//         <div>Tidak ada apa-apa disini</div>
//       ) : null}
//       {postData?.length
//         ? postData.map(post => (
//             <Post
//               key={post.id}
//               postID={post.id}
//               title={post.title}
//               text={post.contents}
//               tags={post.topics}
//               stats={post.stats}
//               timestamp={post.timestamp}
//               fullname={post.author.fullname}
//               username={post.author.username}
//               avatar={post.author.avatarUrl}
//               showControl
//             />
//           ))
//         : null}
//       {error ? (

//       {isValidating && !error ? <div>Memuat lebih banyak...</div> : null}
//     </div>
//   );
// }

function fetcher(url) {
  const fetchOptions = {
    withCredentials: true
  };
  return axios.get(url, fetchOptions).then(({data}) => data.data);
}

function getKey(pageIndex, previousPageData, username) {
  if (!username) {
    return null;
  }

  // change this offset
  const startOffset = 2 * pageIndex + 1;
  const endOffset = startOffset + 1;

  if (previousPageData && !previousPageData.length) {
    return null;
  }

  return `/posts/${username}?limit=${startOffset},${endOffset}`;
}

function ProfilePost({username}) {
  let hasMore = true;
  const key = (pageIndex, previousPageData) =>
    getKey(pageIndex, previousPageData, username);
  const {data, error, mutate, isValidating, setSize} = useSWRInfinite(
    key,
    fetcher
  );
  const postData = data ? [].concat(...data) : [];

  if ((data && !data[data.length - 1].length) || error) {
    hasMore = false;
  } else {
    hasMore = true;
  }

  return (
    <InfiniteScroll
      dataLength={postData.length}
      next={() => setSize(size => size + 1)}
      hasMore={isValidating || hasMore}
      loader={<p style={{textAlign: 'center'}}>Memuat lebih banyak...</p>}
      scrollThreshold="0px"
    >
      {postData.map(post => (
        <Post
          key={post.id}
          postID={post.id}
          title={post.title}
          text={post.contents}
          tags={post.topics}
          stats={post.stats}
          timestamp={post.timestamp}
          fullname={post.author.fullname}
          username={post.author.username}
          avatar={post.author.avatarUrl}
          showControl
        />
      ))}
      {error && !isValidating && (
        <div style={{textAlign: 'center'}}>
          <h2 style={{padding: '2rem'}}>Tidak dapat memuat data</h2>
          <Button onClick={mutate}>Coba lagi</Button>
        </div>
      )}
    </InfiniteScroll>
  );
}

export default ProfilePost;
