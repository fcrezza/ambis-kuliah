import React from 'react';
import {useRouter} from 'next/router';
import useSWR from 'swr';

import ProfileDescription from './ProfileDescription';
import ProfileEdit from './ProfileEdit';
import ProfileMenus from './ProfileMenus';
import Head from 'components/Head';
import {Button} from 'components/Button';
import {useAuth} from 'utils/auth';
import {ProfileContainer, Title, TitleContainer} from './utils';
import axios from 'utils/axios';
import {useUser} from 'utils/user';

function fetcher(url) {
  return axios.get(url).then(({data}) => data.data);
}

function Profile() {
  const router = useRouter();
  const [menuActive, setMenuActive] = React.useState('posts');
  const [isModalOpen, setModalState] = React.useState(false);
  const {logout} = useAuth();
  const {userData} = useUser();
  const isAdmin = userData?.username === router.query?.username;
  const key =
    'username' in router.query ? `/users/${router.query.username}` : null;
  const {data: user, error, mutate} = useSWR(key, fetcher);

  const onClickMenu = menu => {
    if (menuActive !== menu) {
      setMenuActive(menu);
    }
  };

  const onClickEdit = () => {
    setModalState(true);
  };

  const onCloseModal = () => {
    setModalState(false);
  };

  const onClickLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (error?.response.status === 404) {
    return (
      <ProfileContainer>
        <Head
          title={`Profil ${router.query.username} tidak ditemukan - Ambis Kuliah`}
          description={`Profil ${router.query.username} tidak ditemukan`}
        />
        <TitleContainer>
          <Title>Profile</Title>
        </TitleContainer>
        <div style={{textAlign: 'center'}}>
          <h2>404</h2>
          <p>
            Profil <strong>{router.query.username}</strong> tidak ditemukan
          </p>
        </div>
      </ProfileContainer>
    );
  }

  if (error) {
    return (
      <ProfileContainer>
        <Head
          title={`${router.query.username} - Ambis Kuliah`}
          description={`Halaman profil ${router.query.username}`}
        />
        <TitleContainer>
          <Title>Profile</Title>
        </TitleContainer>
        <div style={{textAlign: 'center'}}>
          <h2>Upzzzz, ada yang salah</h2>
          <Button onClick={mutate}>Coba lagi</Button>
        </div>
      </ProfileContainer>
    );
  }

  if (isAdmin) {
    return (
      <ProfileContainer>
        <Head
          title={`${userData.fullname} (@${userData.username}) - Ambis Kuliah`}
          description={`${userData.fullname} profile page`}
        />
        <ProfileEdit
          avatar={userData.avatarUrl}
          fullname={userData.fullname}
          username={userData.username}
          bio={userData.bio}
          isOpen={isModalOpen}
          onClose={onCloseModal}
        />
        <TitleContainer>
          <Title>Profile</Title>
          <Button onClick={onClickLogout}>Logout</Button>
        </TitleContainer>
        <ProfileDescription
          avatar={userData.avatarUrl}
          fullname={userData.fullname}
          username={userData.username}
          bio={userData.bio}
          onClickEdit={onClickEdit}
          isAdmin
        />
        <ProfileMenus
          onClickMenu={onClickMenu}
          menuActive={menuActive}
          username={userData.username}
        />
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <Head
        title={`${user?.fullname} (@${user?.username}) - Ambis Kuliah`}
        description={`${user?.fullname} profile page`}
      />
      <TitleContainer>
        <Title>Profile</Title>
      </TitleContainer>
      <ProfileDescription
        avatar={user?.avatarUrl}
        fullname={user?.fullname}
        username={user?.username}
        bio={user?.bio}
      />
      <ProfileMenus
        onClickMenu={onClickMenu}
        menuActive={menuActive}
        username={user?.username}
      />
    </ProfileContainer>
  );
}

export default Profile;
