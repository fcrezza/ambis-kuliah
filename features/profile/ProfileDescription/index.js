import {Button} from 'components/Button';
import {
  ProfileAvatar,
  ProfileBio,
  ProfileContentHeader,
  ProfileDescriptionContainer,
  ProfileFullname,
  ProfileUsername
} from './style';

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
