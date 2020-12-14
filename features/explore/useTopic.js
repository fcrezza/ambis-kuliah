import React from 'react';
import {useRouter} from 'next/router';

import {useAuth} from 'utils/auth';
import {posts, users} from 'utils/data';

function useTopic() {
  const router = useRouter();
  const {user} = useAuth();
  const [topicDiscussions, setTopicDiscussions] = React.useState(null);
  const [isFollowed, setIsFollowed] = React.useState(() =>
    user.topics.includes(router.query.tag)
  );

  React.useEffect(() => {
    let data = posts.filter(
      post => !post.replyTo && post.tags.includes(router.query.tag)
    );
    data = data.map(post => {
      const user = users.find(user => user.id === post.userID);
      return {
        user,
        post
      };
    });

    setTimeout(() => {
      setTopicDiscussions(data);
    }, 3000);
  }, [router]);

  const onFollowButtonClick = () => {
    setIsFollowed(prevState => !prevState);
  };

  return {
    topicTitle: router.query.tag,
    topicDiscussions,
    isFollowed,
    onFollowButtonClick
  };
}

export default useTopic;
