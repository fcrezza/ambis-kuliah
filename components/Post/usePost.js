import React from 'react';
import {useRouter} from 'next/router';

function usePost() {
  const [reaction, setReaction] = React.useState('');
  const router = useRouter();

  const onReactPost = (reaction, e) => {
    e.stopPropagation();
    setReaction(reaction);
  };

  const onClickPost = (username, postID) => {
    router.push(`/discussion/${username}/${postID}`);
  };

  return {
    reaction,
    onReactPost,
    onClickPost
  };
}

export default usePost;
