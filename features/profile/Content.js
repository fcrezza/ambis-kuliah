import React from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import useSWR from 'swr';
import {useErrorHandler} from 'react-error-boundary';

import ProfileTopics from './Topics';
import ProfileDiscussions from './Discussions';
import ProfileEditModal from './EditModal';
import Head from 'components/Head';
import axios from 'utils/axios';
import {Button} from 'components/Button';
import {useAuth} from 'utils/auth';
import Spinner from 'components/Spinner';

const LeftPane = styled.div`
  width: 480px;
  margin-right: 3rem;
`;

const RightPane = styled.div`
  flex: 1;
`;

const ProfileIdentityContainer = styled.div`
  padding: 1.5rem;
  background: ${({theme}) => theme.colors['white.50']};
  border: 1px solid ${({theme}) => theme.colors['gray.100']};
  border-radius: 10px;
  margin-bottom: 2.5rem;

  & > *:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const ProfileIdentityHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const ProfileFullname = styled.h1`
  color: ${({theme}) => theme.colors['black.100']};
  margin: 0;
  font-size: 1.5rem;
`;

const ProfileUsername = styled.p`
  color: ${({theme}) => theme.colors['black.50']};
  margin: 0;
  font-size: 1rem;
`;

const ProfileBio = styled.p`
  color: ${({theme}) => theme.colors['black.50']};
  margin: 0;
  font-size: 1rem;
  line-height: 30px;
`;

const ProfileAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
  background-color: ${({theme}) => theme.colors['gray.150']};
  background-image: url(${({imageUrl}) => imageUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

function fetcher(url) {
  return axios.get(url).then(({data}) => data.data);
}

const fetchOptions = {
  revalidateOnFocus: false
};

function ProfileContent() {
  const router = useRouter();
  const {userData} = useAuth();
  const key =
    'username' in router.query ? `/users/${router.query.username}` : null;
  const {data: user, error} = useSWR(key, fetcher, fetchOptions);
  useErrorHandler(error);
  const isAdmin = userData?.username === user?.username;
  const [isModalOpen, setModalState] = React.useState(false);

  const onClickEdit = () => {
    setModalState(true);
  };

  const onCloseModal = () => {
    setModalState(false);
  };

  return (
    <>
      <LeftPane>
        <ProfileIdentityContainer>
          <Head
            title={`${user?.fullname} (@${user?.username}) - Ambis Kuliah`}
            description={`${user?.fullname} profile page`}
          />
          {!user ? (
            <SpinnerContainer>
              <Spinner />
            </SpinnerContainer>
          ) : (
            <>
              <ProfileIdentityHeader>
                <ProfileAvatar imageUrl={user?.avatar.url} />
                {isAdmin ? (
                  <Button variant="outline" onClick={onClickEdit}>
                    Edit Profil
                  </Button>
                ) : null}
              </ProfileIdentityHeader>
              <ProfileFullname>{user?.fullname}</ProfileFullname>
              <ProfileUsername>@{user?.username}</ProfileUsername>
              <ProfileBio>{user?.bio}</ProfileBio>
              <ProfileEditModal
                avatar={user?.avatar.url}
                fullname={user?.fullname}
                username={user?.username}
                bio={user?.bio}
                email={user?.email}
                isOpen={isModalOpen}
                onClose={onCloseModal}
              />
            </>
          )}
        </ProfileIdentityContainer>
        <ProfileTopics topics={userData.topics} isAdmin={isAdmin} />
      </LeftPane>
      <RightPane>
        <ProfileDiscussions username={user?.username} />
      </RightPane>
    </>
  );
}
export default ProfileContent;
