import {useState} from 'react';
import {useRouter} from 'next/router';

function useNavigation() {
  const [isModalOpen, setModalState] = useState(false);
  const router = useRouter();
  const isShowed = !['/', '/login', '/signup', '/signup/topics'].includes(
    router.pathname
  );

  const onClickWrite = () => {
    setModalState(true);
  };

  const onModalClose = () => {
    setModalState(false);
  };

  return {
    isShowed,
    isModalOpen,
    onClickWrite,
    onModalClose
  };
}

export default useNavigation;
