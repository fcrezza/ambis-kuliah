import styled from 'styled-components';

import ProfileDescription from './ProfileDescription';
import ProfileEdit from './ProfileEdit';
import ProfileMenus from './ProfileMenus';
import Head from 'components/Head';
import {Button} from 'components/Button';
import useProfile from './useProfile';
import {useAuth} from 'utils/auth';
import {useRouter} from 'next/router';

const ProfileContainer = styled.main`
  flex: 1;
  border-radius: 5px;
  border: 1px solid #d9d9d9;

  @media screen and (max-width: 768px) {
    border: 0;
  }
`;

const TitleContainer = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray.100']};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  color: ${({theme}) => theme.colors['black.150']};
  margin: 0;
  font-size: 1.6rem;
`;

function Profile() {
  const {
    user,
    menuActive,
    isModalOpen,
    onMenuClick,
    onEditClick,
    onModalClose
  } = useProfile();
  const {user: authUser} = useAuth();
  const router = useRouter();

  return (
    <ProfileContainer>
      <Head
        title={`${user?.fullname} (@${user?.username}) - Ambis Kuliah`}
        description={`${user?.fullname} profile page`}
      />
      <ProfileEdit isOpen={isModalOpen} onClose={onModalClose} />
      <TitleContainer>
        <Title>Profile</Title>
        {router.query.username === authUser.username ? (
          <Button>Logout</Button>
        ) : null}
      </TitleContainer>
      <ProfileDescription
        avatar={user?.avatar}
        fullname={user?.fullname}
        username={user?.username}
        bio={user?.bio}
        onEditClick={onEditClick}
      />
      <ProfileMenus
        onMenuClick={onMenuClick}
        menuActive={menuActive}
        userID={user?.id}
        userAvatar={user?.avatar}
        userFullname={user?.fullname}
        userUsername={user?.username}
      />
    </ProfileContainer>
  );
}

export default Profile;
