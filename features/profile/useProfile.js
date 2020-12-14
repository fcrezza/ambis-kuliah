import React from 'react';
import {useRouter} from 'next/router';
import {users} from 'utils/data';

function useProfile() {
  const [menuActive, setMenuActive] = React.useState('post');
  const [isModalOpen, setModalState] = React.useState(false);
  const router = useRouter();
  const [user, setUser] = React.useState(null);

  const onMenuClick = menu => {
    if (menuActive !== menu) {
      setMenuActive(menu);
    }
  };

  const onEditClick = () => {
    setModalState(true);
  };

  const onModalClose = () => {
    setModalState(false);
  };

  React.useEffect(() => {
    setUser(users.find(user => user.username === router.query.username));
  }, [router]);

  return {
    user,
    menuActive,
    isModalOpen,
    onMenuClick,
    onEditClick,
    onModalClose
  };
}

export default useProfile;
