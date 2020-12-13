import {useState, useEffect} from 'react';

import {posts, users} from 'utils/data';

function useDiscussions() {
  const [discussions, setDiscussions] = useState(null);

  useEffect(() => {
    let data = posts.filter(post => !post.replyTo);
    data = data.map(post => {
      const user = users.find(user => user.id === post.userID);
      return {
        user,
        post
      };
    });

    setTimeout(() => {
      setDiscussions(data);
    }, 3000);
  }, []);

  return {
    discussions
  };
}

export default useDiscussions;
