import {useState} from 'react';
import {useRouter} from 'next/router';

function useNavigation() {
  const [isModalOpen, setModalState] = useState(false);
  const router = useRouter();
  const isShowed = !['/', '/topics', '/login', '/signup'].includes(
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
