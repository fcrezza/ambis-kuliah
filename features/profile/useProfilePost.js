import React from 'react';

import {posts} from 'utils/data';

function useProfilePost(userID) {
  const [userPosts, setUserPosts] = React.useState(null);

  React.useEffect(() => {
    let data = posts.filter(post => !post.replyTo && post.userID === userID);
    setTimeout(() => {
      setUserPosts(data);
    }, 3000);
  }, [userID]);

  return {
    userPosts
  };
}

export default useProfilePost;
