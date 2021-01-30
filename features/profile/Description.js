import styled from 'styled-components';

import {Button} from 'components/Button';

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

const ProfileAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
`;

function ProfileDescription(props) {
  const {avatar, isAdmin, fullname, username, bio, onClickEdit} = props;
  return (
    <ProfileDescriptionContainer>
      <ProfileContentHeader>
        <ProfileAvatar src={avatar} alt={`${fullname} avatar`} />
        {isAdmin ? (
          <Button variant="outline" onClick={onClickEdit}>
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
