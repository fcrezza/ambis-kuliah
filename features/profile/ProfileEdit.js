import styled from 'styled-components';
import {darken} from 'polished';

import {ProfileAvatar} from './shared';
import {Button} from 'components/Button';
import Modal from 'components/Modal';
import useProfileEdit from './useProfileEdit';
import {useAuth} from 'utils/auth';

const ProfileEditContainer = styled.div`
  padding: 1.5rem;
`;

const AvatarWrapper = styled.div`
  padding: 1.5rem 0 3rem;
`;

const ButtonWrapper = styled.div`
  text-align: right;
`;

const InputGroup = styled.div`
  margin-bottom: 2rem;
`;

const InputLabel = styled.label`
  color: ${({theme}) => theme.colors['black.150']};
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1rem;
  display: inline-block;
`;

const Input = styled.input`
  padding: 0.8rem;
  width: 100%;
  background-color: ${({theme, disabled}) =>
    disabled ? darken(0.05, theme.colors['gray.50']) : theme.colors['gray.50']};
  border: 1px solid ${({theme}) => theme.colors['gray.150']};
  font-size: 1rem;
  color: ${({theme, disabled}) =>
    disabled ? theme.colors['black.50'] : theme.colors['black.100']};
  border-radius: 5px;

  &:hover,
  &:focus {
    background-color: ${({theme}) => darken(0.02, theme.colors['gray.50'])};
  }
`;

const Textarea = styled.textarea`
  background-color: ${({theme}) => theme.colors['gray.50']};
  border: 1px solid ${({theme}) => theme.colors['gray.150']};
  padding: 0.8rem;
  font-size: 1rem;
  width: 100%;
  color: ${({theme}) => theme.colors['black.100']};
  min-height: 100px;
  resize: vertical;
  display: block;
  border-radius: 5px;

  &:hover,
  &:focus {
    background-color: ${({theme}) => darken(0.02, theme.colors['gray.50'])};
  }
`;

function ProfileEdit({isOpen, onClose}) {
  const {user} = useAuth();
  const {
    usernameValue,
    fullnameValue,
    bioValue,
    onUsernameChange,
    onFullnameChange,
    onBioChange
  } = useProfileEdit(user.fullname, user.username, user.bio);
  return (
    <Modal title="Edit Profil" isOpen={isOpen} onClose={onClose}>
      <ProfileEditContainer>
        <AvatarWrapper>
          <ProfileAvatar src={user.avatar} alt={`${user.fullname} avatar`} />
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
