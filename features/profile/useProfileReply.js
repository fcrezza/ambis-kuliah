import React from 'react';

import {posts} from 'utils/data';

function useProfileReply(userID) {
  const [userReplies, setUserReplies] = React.useState(null);

  React.useEffect(() => {
    const replies = posts.filter(
      post => post.userID === userID && Boolean(post.replyTo)
    );

    setTimeout(() => {
      setUserReplies(replies);
    }, 3000);
  }, [userID]);

  return {
    userReplies
  };
}

export default useProfileReply;
