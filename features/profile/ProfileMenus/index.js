import ProfilePosts from '../ProfilePosts';
import ProfileReplies from '../ProfileReplies';
import {ProfileMenuContainer, MenuLink} from './utils';

function ProfileMenus({menuActive, onClickMenu, username}) {
  return (
    <>
      <ProfileMenuContainer>
        <MenuLink
          isActive={menuActive === 'posts'}
          onClick={() => onClickMenu('posts')}
        >
          Tulisan
        </MenuLink>
        <MenuLink
          isActive={menuActive === 'replies'}
          onClick={() => onClickMenu('replies')}
        >
          Balasan
        </MenuLink>
      </ProfileMenuContainer>
      {menuActive === 'posts' ? (
        <ProfilePosts username={username} />
      ) : (
        <ProfileReplies username={username} />
      )}
    </>
  );
}

export default ProfileMenus;
