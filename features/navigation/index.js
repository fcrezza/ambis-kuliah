import React from 'react';

import MobileNavigation from './MobileNavigation';
import DesktopNavigation from './DesktopNavigation';
import useNavigation from './useNavigation';
import WritePost from 'components/writePost';
import Modal from 'components/Modal';

function Navigation() {
  const {isShowed, isModalOpen, onClickWrite, onModalClose} = useNavigation();

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
      <DesktopNavigation isShowed={isShowed} onClickWrite={onClickWrite} />
      {!isModalOpen && (
        <MobileNavigation isShowed={isShowed} onClickWrite={onClickWrite} />
      )}
    </>
  );
}

export default Navigation;
