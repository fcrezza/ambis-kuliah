import React from 'react';

function useExplore() {
  const [isModalOpen, setModalState] = React.useState(false);

  const onSettingClick = () => {
    setModalState(true);
  };

  const onModalClose = () => {
    setModalState(false);
  };

  return {
    isModalOpen,
    onSettingClick,
    onModalClose
  };
}

export default useExplore;
