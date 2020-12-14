import React from 'react';
import {useRouter} from 'next/router';

function usePost() {
  const [reaction, setReaction] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const router = useRouter();

  const onReactPost = (reaction, e) => {
    e.stopPropagation();
    setReaction(reaction);
  };

  const onClickPost = (username, postID) => {
    router.push(`/discussion/${username}/${postID}`);
  };

  const onReplyClick = e => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  return {
    reaction,
    isModalOpen,
    onReplyClick,
    onModalClose,
    onReactPost,
    onClickPost
  };
}

export default usePost;
