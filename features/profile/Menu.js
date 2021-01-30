import * as React from 'react';
import styled from 'styled-components';
import {lighten} from 'polished';

import ProfilePosts from './Posts';
import ProfileReplies from './Replies';

const ProfileMenuContainer = styled.div`
  border-top: 1px solid ${({theme}) => theme.colors['gray.100']};
  border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
`;

const MenuLink = styled.button`
  border: 0;
  background: ${({theme, isActive}) =>
    isActive ? lighten(0.2, theme.colors['orange.50']) : 'transparent'};
  display: inline-block;
  width: 50%;
  padding: 1.5rem;
  color: ${({theme}) => theme.colors['black.100']};
  font-size: 1.1rem;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${({theme, isActive}) =>
      !isActive && theme.colors['gray.50']};
  }
`;

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
