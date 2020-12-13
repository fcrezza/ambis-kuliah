import {useState, useEffect} from 'react';

import {users, posts} from 'utils/data';

function useHotDiscussions() {
  const [hotDiscussions, setHotDiscussions] = useState(null);

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
      setHotDiscussions(data);
    }, 2000);
  }, []);

  return {hotDiscussions};
}

export default useHotDiscussions;
