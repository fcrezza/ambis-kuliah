import React from 'react';
import {useRouter} from 'next/router';
import useSWR from 'swr';

import ProfileDescription from './ProfileDescription';
import ProfileEditModal from './ProfileEditModal';
import ProfileMenu from './ProfileMenu';
import Head from 'components/Head';
import axios from 'utils/axios';
import {Button} from 'components/Button';
import {useAuth} from 'utils/auth';
import {ProfileContainer, Title, TitleContainer} from './style';
import {useUser} from 'utils/user';

function fetcher(url) {
  return axios.get(url).then(({data}) => data.data);
}

const fetchOptions = {
  revalidateOnFocus: false
};

function Profile() {
  const router = useRouter();
  const {userData} = useUser();
  const [isModalOpen, setModalState] = React.useState(false);
  const {logout} = useAuth();
  const key =
    'username' in router.query ? `/users/${router.query.username}` : null;
  const {data: user, error, mutate, isValidating} = useSWR(
    key,
    fetcher,
    fetchOptions
  );
  const isAdmin = userData?.username === user?.username;

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

  if (error?.response?.status === 404) {
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

  if (error && !user) {
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

  if (!user && isValidating) {
    return (
      <ProfileContainer>
        <Head
          title={`${router.query.username} - Ambis Kuliah`}
          description={`Halaman profil ${router.query.username}`}
        />
        <TitleContainer>
          <Title>Profile</Title>
        </TitleContainer>
        <div>loading...</div>;
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <Head
        title={`${user?.fullname} (@${user?.username}) - Ambis Kuliah`}
        description={`${user?.fullname} profile page`}
      />
      <ProfileEditModal
        avatar={user?.avatar.url}
        fullname={user?.fullname}
        username={user?.username}
        bio={user?.bio}
        email={user?.email}
        isOpen={isModalOpen}
        onClose={onCloseModal}
      />
      <TitleContainer>
        <Title>Profile</Title>
        {isAdmin && <Button onClick={onClickLogout}>Logout</Button>}
      </TitleContainer>
      <ProfileDescription
        avatar={user?.avatar.url}
        fullname={user?.fullname}
        username={user?.username}
        bio={user?.bio}
        onClickEdit={onClickEdit}
        isAdmin={isAdmin}
      />
      <ProfileMenu username={user?.username} />
    </ProfileContainer>
  );
}

export default Profile;
