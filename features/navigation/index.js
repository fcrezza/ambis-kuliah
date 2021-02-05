import React from 'react';
import {useRouter} from 'next/router';

import MobileNavigation from './MobileNavigation';
import DesktopNavigation from './DesktopNavigation';
import WritePost from 'components/writePost';
import Modal from 'components/Modal';

function Navigation() {
  const [isModalOpen, setModalState] = React.useState(false);
  const router = useRouter();

  const onClickLogin = () => {
    router.push('/login');
  };

  const onClickWrite = () => {
    setModalState(true);
  };

  const onModalClose = () => {
    setModalState(false);
  };

  return (
    <>
      <Modal
        title="Tulis Sesuatu"
        contentLabel="compose discussion"
        onClose={onModalClose}
        isOpen={isModalOpen}
      >
        <WritePost onSubmitPost={onModalClose} />
      </Modal>
      <DesktopNavigation
        onClickWrite={onClickWrite}
        onClickLogin={onClickLogin}
      />
      {!isModalOpen && <MobileNavigation onClickWrite={onClickWrite} />}
    </>
  );
}

export default Navigation;
