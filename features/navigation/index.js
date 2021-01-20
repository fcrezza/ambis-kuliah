import React from 'react';

import MobileNavigation from './MobileNavigation';
import DesktopNavigation from './DesktopNavigation';
import useNavigation from './useNavigation';
import WritePost from 'features/writePost';
import Modal from 'components/Modal';
import {useUser} from 'utils/user';

function Navigation() {
  const {isShowed, isModalOpen, onClickWrite, onModalClose} = useNavigation();
  const {userData} = useUser();

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
        isAuth={!!userData}
        onClickWrite={onClickWrite}
      />
      {!isModalOpen ? (
        <MobileNavigation
          isShowed={isShowed}
          isAuth={!!userData}
          onClickWrite={onClickWrite}
        />
      ) : null}
    </>
  );
}

export default Navigation;
