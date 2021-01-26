import * as React from 'react';
import ProfilePosts from '../ProfilePosts';
import ProfileReplies from '../ProfileReplies';
import {ProfileMenuContainer, MenuLink} from './style';

function ProfileMenu({username}) {
  const [menuActive, setMenuActive] = React.useState(0);

  const onClick = menu => {
    setMenuActive(menu);
  };

  return (
    <>
      <ProfileMenuContainer>
        <MenuLink isActive={menuActive === 0} onClick={() => onClick(0)}>
          Tulisan
        </MenuLink>
        <MenuLink isActive={menuActive === 1} onClick={() => onClick(1)}>
          Balasan
        </MenuLink>
      </ProfileMenuContainer>
      {menuActive === 0 ? (
        <ProfilePosts username={username} />
      ) : (
        <ProfileReplies username={username} />
      )}
    </>
  );
}

export default ProfileMenu;
