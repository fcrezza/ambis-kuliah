import React from 'react';

import MobileNavigation from './MobileNavigation';
import DesktopNavigation from './DesktopNavigation';
import useNavigation from './useNavigation';
import WritePost from 'components/WritePost';
import Modal from 'components/Modal';

function Navigation() {
  const {isShowed, isModalOpen, onClickWrite, onModalClose} = useNavigation();
  const isAuth = true;

  return (
    <>
      <Modal
        title="Tulis Sesuatu"
        contentLabel="compose discussion"
        onClose={onModalClose}
        isOpen={isModalOpen}
      >
        <WritePost />
      </Modal>
      <DesktopNavigation
        isShowed={isShowed}
        isAuth={isAuth}
        onClickWrite={onClickWrite}
      />
      {!isModalOpen ? (
        <MobileNavigation
          isShowed={isShowed}
          isAuth={isAuth}
          onClickWrite={onClickWrite}
        />
      ) : null}
    </>
  );
}

export default Navigation;
