import React from 'react';
import Modal from 'components/Modal';
import {Button} from 'components/Button';
import {
  ProfileAvatar,
  ProfileEditContainer,
  AvatarWrapper,
  Input,
  InputGroup,
  InputLabel,
  ButtonWrapper,
  Textarea
} from './style';

function ProfileEdit({isOpen, onClose, username, fullname, bio, avatar}) {
  const [usernameValue, setUsername] = React.useState(() => username);
  const [fullnameValue, setFullname] = React.useState(() => fullname);
  const [bioValue, setBio] = React.useState(() => bio);

  const onUsernameChange = e => {
    setUsername(e.target.value);
  };
  const onFullnameChange = e => {
    setFullname(e.target.value);
  };
  const onBioChange = e => {
    setBio(e.target.value);
  };

  return (
    <Modal title="Edit Profil" isOpen={isOpen} onClose={onClose}>
      <ProfileEditContainer>
        <AvatarWrapper>
          <ProfileAvatar src={avatar} alt={`${fullname} avatar`} />
        </AvatarWrapper>
        <InputGroup>
          <InputLabel htmlFor="fullname">Nama Lengkap</InputLabel>
          <Input
            type="text"
            value={fullnameValue}
            onChange={onFullnameChange}
            id="fullname"
          />
        </InputGroup>
        <InputGroup>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            type="text"
            value={usernameValue}
            onChange={onUsernameChange}
            id="username"
            disabled
          />
        </InputGroup>
        <InputGroup>
          <InputLabel htmlFor="bio">Bio</InputLabel>
          <Textarea id="bio" value={bioValue} onChange={onBioChange} />
        </InputGroup>
        <ButtonWrapper>
          <Button>Simpan</Button>
        </ButtonWrapper>
      </ProfileEditContainer>
    </Modal>
  );
}

export default ProfileEdit;
