import styled from 'styled-components';
import {lighten} from 'polished';

import ProfilePost from './ProfilePost';
import ProfileReply from './ProfileReply';

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

function ProfileMenus({
  menuActive,
  onMenuClick,
  userID,
  userAvatar,
  userFullname,
  userUsername
}) {
  return (
    <>
      <ProfileMenuContainer>
        <MenuLink
          isActive={menuActive === 'post'}
          onClick={() => onMenuClick('post')}
        >
          Tulisan
        </MenuLink>
        <MenuLink
          isActive={menuActive === 'reply'}
          onClick={() => onMenuClick('reply')}
        >
          Balasan
        </MenuLink>
      </ProfileMenuContainer>
      {menuActive === 'post' ? (
        <ProfilePost
          userID={userID}
          userAvatar={userAvatar}
          userFullname={userFullname}
          userUsername={userUsername}
        />
      ) : (
        <ProfileReply
          userID={userID}
          userAvatar={userAvatar}
          userFullname={userFullname}
          userUsername={userUsername}
        />
      )}
    </>
  );
}

export default ProfileMenus;
