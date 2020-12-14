import React from 'react';
import {useRouter} from 'next/router';

import {posts, users} from 'utils/data';

function useReplyDiscussion() {
  const router = useRouter();
  const [replyDiscussions, setReplyDiscussion] = React.useState(null);

  React.useEffect(() => {
    if ('id' in router.query) {
      const user = users.find(user => user.username === router.query.id[0]);
      let replies = posts.filter(
        ({replyTo}) =>
          replyTo?.postID === Number(router.query.id[1]) &&
          replyTo?.userID === user.id
      );
      replies = replies.map(reply => ({
        ...reply,
        user: users.find(user => user.id === reply.userID)
      }));

      setTimeout(() => {
        setReplyDiscussion(replies);
      }, 3000);
    }
  }, [router]);

  return {
    replyDiscussions
  };
}

export default useReplyDiscussion;
