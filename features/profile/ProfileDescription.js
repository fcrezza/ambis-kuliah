import styled from 'styled-components';

import {ProfileAvatar} from './shared';
import {Button} from 'components/Button';
import {useRouter} from 'next/router';
import {useAuth} from 'utils/auth';

const ProfileDescriptionContainer = styled.div`
  padding: 3.5rem 1.5rem;

  & > *:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const ProfileContentHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const ProfileFullname = styled.h2`
  color: ${({theme}) => theme.colors['black.150']};
  margin: 0;
  font-size: 1.5rem;
`;

const ProfileUsername = styled.p`
  color: ${({theme}) => theme.colors['black.100']};
  margin: 0;
  font-size: 1rem;
`;

const ProfileBio = styled.p`
  color: ${({theme}) => theme.colors['black.100']};
  margin: 0;
  font-size: 1.1rem;
  line-height: 30px;
`;

function ProfileDescription({avatar, fullname, username, bio, onEditClick}) {
  const {user} = useAuth();
  const router = useRouter();

  return (
    <ProfileDescriptionContainer>
      <ProfileContentHeader>
        <ProfileAvatar src={avatar} alt={`${fullname} avatar`} />
        {router.query.username === user.username ? (
          <Button variant="outline" onClick={onEditClick}>
            Edit Profil
          </Button>
        ) : null}
      </ProfileContentHeader>
      <ProfileFullname>{fullname}</ProfileFullname>
      <ProfileUsername>@{username}</ProfileUsername>
      <ProfileBio>{bio}</ProfileBio>
    </ProfileDescriptionContainer>
  );
}

export default ProfileDescription;
