import React from 'react';
import {useRouter} from 'next/router';

import {posts, users} from 'utils/data';

function usePostDiscussion() {
  const router = useRouter();
  const [postDiscussion, setPostDiscussion] = React.useState(null);

  React.useEffect(() => {
    if ('id' in router.query) {
      const post = posts.find(post => post.id === Number(router.query.id[1]));
      const user = users.find(user => user.username === router.query.id[0]);

      setTimeout(() => {
        setPostDiscussion({post, user});
      }, 3000);
    }
  }, [router]);

  return {
    postDiscussion
  };
}

export default usePostDiscussion;
